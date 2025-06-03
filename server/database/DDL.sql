-- -----------------------------------------------------
-- Disable foreign key checks to prevent constraint errors during inserts
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

-- -----------------------------------------------------
-- Drop Existing Tables if They Exist (to prevent conflicts)
-- -----------------------------------------------------
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS game_data;

-- -----------------------------------------------------
-- Create Table: users
-- -----------------------------------------------------

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Stored Procedure: RegisterUser
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS RegisterUser;
DELIMITER //

CREATE PROCEDURE RegisterUser(
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255)
)
BEGIN
    DECLARE new_user_id INT;

    -- Insert user into 'users' table
    INSERT INTO users (username, email, password_hash)
    VALUES (p_username, p_email, p_password_hash);

    -- Get the ID of the newly inserted user
    SET new_user_id = LAST_INSERT_ID();

    -- Insert default game data for each game
    INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date)
    VALUES 
        (new_user_id, 'Snake', 0, 0, CURDATE()),
        (new_user_id, 'Tetris', 0, 0, CURDATE()),
        (new_user_id, 'Set', 0, 0, CURDATE()),
        (new_user_id, 'Pacman', 0, 0, CURDATE()),
        (new_user_id, 'Yahtzee', 0, NULL, NULL),
        (new_user_id, 'Pong', 0, NULL, NULL);
END //

DELIMITER ;

-- -----------------------------------------------------
-- Stored Procedure: GetUserInfo
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS GetUserInfo;
DELIMITER //

CREATE PROCEDURE GetUserInfo (IN p_username VARCHAR(50))
BEGIN
    SELECT
        users.id,
        users.username,
        users.password_hash
    FROM users
    WHERE users.username = p_username;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Create Table: game_data
-- -----------------------------------------------------

CREATE TABLE game_data (
    user_id INT NOT NULL,
    game_name VARCHAR(50) NOT NULL,
    play_count INT DEFAULT 0,
    high_score INT DEFAULT NULL,
    high_score_date DATE DEFAULT NULL,  
    PRIMARY KEY (user_id, game_name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Stored Procedure: GetUserTableStats
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS GetUserTableStats;
DELIMITER //

CREATE PROCEDURE GetUserTableStats (IN p_user_id INT)
BEGIN
    SELECT
        gd.game_name,
        gd.play_count,
        gd.high_score,
        gd.high_score_date,
        u.created_at AS account_created_at
    FROM game_data gd
    JOIN users u ON gd.user_id = u.id
    WHERE gd.user_id = p_user_id
    ORDER BY gd.game_name ASC;
END //

DELIMITER ;


-- -----------------------------------------------------
-- Stored Procedure: GetUserGameStats
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS GetUserGameStats;

DELIMITER //

CREATE PROCEDURE GetUserGameStats (
    IN p_user_id INT,
    IN p_game_name VARCHAR(50)
)
BEGIN
    SELECT
        play_count,
        high_score,
        high_score_date
    FROM game_data
    WHERE user_id = p_user_id
      AND game_name = p_game_name;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Stored Procedure: UpdateHighScore
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS UpdateHighScore;
DELIMITER //

CREATE PROCEDURE UpdateHighScore(
  IN p_user_id INT,
  IN p_game_name VARCHAR(50),
  IN p_new_score INT,
  IN p_play_count INT
)
BEGIN
  DECLARE current_score INT;

  -- Get the current high score 
  SELECT high_score INTO current_score
  FROM game_data
  WHERE user_id = p_user_id AND game_name = p_game_name;

  UPDATE game_data
  SET
    play_count = p_play_count,
    
    -- Update if new score is greater than current score
    high_score = CASE
      WHEN p_new_score > current_score THEN p_new_score
      ELSE high_score
    END,

    -- If there is a new highscore, update the score date
    high_score_date = CASE
      WHEN p_new_score > current_score THEN DATE(NOW())
      ELSE high_score_date
    END
  WHERE user_id = p_user_id AND game_name = p_game_name;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Stored Procedure: GetLeaderboardStats
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS GetLeaderboardStats;
DELIMITER //

CREATE PROCEDURE GetLeaderboardStats (IN p_game_name VARCHAR(50))
BEGIN
    SELECT
        u.username,
        g.high_score,
        g.high_score_date
    FROM game_data g
    JOIN users u ON g.user_id = u.id
    WHERE g.game_name = p_game_name
    ORDER BY g.high_score DESC
    LIMIT 10;
END //

DELIMITER ;


-- -----------------------------------------------------
-- Re-enable foreign key checks and commit changes
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
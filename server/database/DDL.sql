-- -----------------------------------------------------
-- Drop Existing Tables if They Exist (to prevent conflicts)
-- -----------------------------------------------------
DROP TABLE IF EXISTS game_data;
DROP TABLE IF EXISTS users;

-- -----------------------------------------------------
-- Create Table: users
-- -----------------------------------------------------

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
-- Function: register_user
-- -----------------------------------------------------

CREATE OR REPLACE FUNCTION register_user(
    p_username VARCHAR(50),
    p_email VARCHAR(100),
    p_password_hash VARCHAR(255)
) RETURNS VOID AS $$
DECLARE
    new_user_id INT;
BEGIN
    -- Insert user into 'users' table
    INSERT INTO users (username, email, password_hash)
    VALUES (p_username, p_email, p_password_hash)
    RETURNING id INTO new_user_id;

    -- Insert default game data for each game
    INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date)
    VALUES
        (new_user_id, 'Snake', 0, 0, CURRENT_DATE),
        (new_user_id, 'Tetris', 0, 0, CURRENT_DATE),
        (new_user_id, 'Set', 0, 0, CURRENT_DATE),
        (new_user_id, 'Pacman', 0, 0, CURRENT_DATE),
        (new_user_id, 'Yahtzee', 0, NULL, NULL),
        (new_user_id, 'Pong', 0, NULL, NULL);
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------
-- Function: get_user_info
-- -----------------------------------------------------

CREATE OR REPLACE FUNCTION get_user_info(p_username VARCHAR(50))
RETURNS TABLE (
    id INT,
    username VARCHAR(50),
    password_hash VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        users.id,
        users.username,
        users.password_hash
    FROM users
    WHERE users.username = p_username;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------
-- Function: get_user_table_stats
-- -----------------------------------------------------

CREATE OR REPLACE FUNCTION get_user_table_stats(p_user_id INT)
RETURNS TABLE (
    game_name VARCHAR(50),
    play_count INT,
    high_score INT,
    high_score_date DATE,
    account_created_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
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
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------
-- Function: get_user_game_stats
-- -----------------------------------------------------

CREATE OR REPLACE FUNCTION get_user_game_stats(
    p_user_id INT,
    p_game_name VARCHAR(50)
)
RETURNS TABLE (
    play_count INT,
    high_score INT,
    high_score_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        game_data.play_count,
        game_data.high_score,
        game_data.high_score_date
    FROM game_data
    WHERE user_id = p_user_id
      AND LOWER(game_name) = LOWER(p_game_name);
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------
-- Function: update_high_score
-- -----------------------------------------------------

CREATE OR REPLACE FUNCTION update_high_score(
    p_user_id INT,
    p_game_name VARCHAR(50),
    p_new_score INT,
    p_play_count INT
) RETURNS VOID AS $$
DECLARE
    current_score INT;
BEGIN
    -- Get the current high score
    SELECT high_score INTO current_score
    FROM game_data
    WHERE user_id = p_user_id AND LOWER(game_name) = LOWER(p_game_name);

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
            WHEN p_new_score > current_score THEN CURRENT_DATE
            ELSE high_score_date
        END
    WHERE user_id = p_user_id AND LOWER(game_name) = LOWER(p_game_name);
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------
-- Function: get_leaderboard_stats
-- -----------------------------------------------------

CREATE OR REPLACE FUNCTION get_leaderboard_stats(p_game_name VARCHAR(50))
RETURNS TABLE (
    username VARCHAR(50),
    high_score INT,
    high_score_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.username,
        g.high_score,
        g.high_score_date
    FROM game_data g
    JOIN users u ON g.user_id = u.id
    WHERE LOWER(g.game_name) = LOWER(p_game_name)
    ORDER BY g.high_score DESC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;

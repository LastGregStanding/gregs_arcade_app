---------------------------------------------------
------ User Account Data -------
---------------------------------------------------

INSERT INTO users (username, email, password_hash, created_at)
VALUES
  ('PixelPanda42','pixelpanda42@example.com','hashed_pw1','2025-01-12'),
  ('TurboChicken','turbochicken@example.com','hashed_pw2','2025-03-03'),
  ('ChocolateChip5','chocolateChip5@example.com','hashed_pw3','2025-05-08'),
  ('QuestJumper','questjumper@example.com','hashed_pw4','2025-01-25'),
  ('ZapCabbage9','zapcabbage9@example.com','hashed_pw5','2025-02-14'),
  ('GreenDuck52','greenduck52@example.com','hashed_pw6','2025-04-19'),
  ('SnappyTuna11','snappytuna11@example.com','hashed_pw7','2025-01-31'),
  ('SacredWizard','sacredwizard@example.com','hashed_pw8','2025-05-23'),
  ('MarbleBounce13','marblebounce13@example.com','hashed_pw9','2025-03-27'),
  ('TacoGalaxy','tacogalaxy@example.com','hashed_pw10','2025-02-05');



---------------------------------------------------
------ Game Data -------
---------------------------------------------------

REPLACE INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
-- User 1
(1, 'Tetris', 2, 60, '2025-05-23'),
(1, 'Snake', 1, 2, '2025-05-24'),
(1, 'Pong', 1, NULL, NULL),
(1, 'Pacman', 1, 4100, '2025-05-27'),
(1, 'Set', 2, 5, '2025-05-26'),
(1, 'Yahtzee', 3, NULL, NULL),

-- User 2
(2, 'Tetris', 12, 180, '2025-03-05'),
(2, 'Snake', 16, 5, '2025-03-10'),
(2, 'Pong', 2, NULL, NULL),
(2, 'Pacman', 8, 2500, '2025-03-15'),
(2, 'Set', 9, 6, '2025-03-12'),
(2, 'Yahtzee', 5, NULL, NULL),

-- User 3
(3, 'Tetris', 10, 30, '2025-05-10'),
(3, 'Snake', 22, 3, '2025-05-11'),
(3, 'Pong', 1, NULL, NULL),
(3, 'Pacman', 7, 4100, '2025-05-12'),
(3, 'Set', 6, 5, '2025-05-10'),
(3, 'Yahtzee', 4, NULL, NULL),

-- User 4
(4, 'Tetris', 11, 80, '2025-01-30'),
(4, 'Snake', 14, 2, '2025-02-01'),
(4, 'Pong', 3, NULL, NULL),
(4, 'Pacman', 9, 3400, '2025-02-02'),
(4, 'Set', 8, 7, '2025-01-29'),
(4, 'Yahtzee', 6, NULL, NULL),

-- User 5
(5, 'Tetris', 9, 130, '2025-02-20'),
(5, 'Snake', 17, 4, '2025-02-22'),
(5, 'Pong', 5, NULL, NULL),
(5, 'Pacman', 6, 2900, '2025-02-25'),
(5, 'Set', 7, 6, '2025-02-21'),
(5, 'Yahtzee', 3, NULL, NULL),

-- User 6
(6, 'Tetris', 14, 110, '2025-04-22'),
(6, 'Snake', 13, 7, '2025-04-24'),
(6, 'Pong', 6, NULL, NULL),
(6, 'Pacman', 11, 3700, '2025-04-26'),
(6, 'Set', 5, 3, '2025-04-23'),
(6, 'Yahtzee', 7, NULL, NULL),

-- User 7
(7, 'Tetris', 8, 70, '2025-01-31'),
(7, 'Snake', 20, 6, '2025-02-02'),
(7, 'Pong', 4, NULL, NULL),
(7, 'Pacman', 10, 3200, '2025-02-05'),
(7, 'Set', 7, 4, '2025-02-01'),
(7, 'Yahtzee', 5, NULL, NULL),

-- User 8
(8, 'Tetris', 16, 90, '2025-05-25'),
(8, 'Snake', 19, 8, '2025-05-26'),
(8, 'Pong', 3, NULL, NULL),
(8, 'Pacman', 12, 4000, '2025-05-27'),
(8, 'Set', 6, 5, '2025-05-25'),
(8, 'Yahtzee', 4, NULL, NULL),

-- User 9
(9, 'Tetris', 13, 60, '2025-03-29'),
(9, 'Snake', 15, 7, '2025-03-30'),
(9, 'Pong', 2, NULL, NULL),
(9, 'Pacman', 9, 3600, '2025-04-01'),
(9, 'Set', 8, 6, '2025-03-28'),
(9, 'Yahtzee', 6, NULL, NULL),

-- User 10
(10, 'Tetris', 17, 20, '2025-02-10'),
(10, 'Snake', 21, 9, '2025-02-12'),
(10, 'Pong', 5, NULL, NULL),
(10, 'Pacman', 14, 3800, '2025-02-15'),
(10, 'Set', 7, 5, '2025-02-11'),
(10, 'Yahtzee', 3, NULL, NULL),
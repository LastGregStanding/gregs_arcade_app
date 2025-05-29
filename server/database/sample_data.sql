INSERT INTO users (username, email, password_hash)
VALUES
-- Password: password1
('bob', 'bob@example.com', '$2b$10$oz4eQ0Zlf2LJ63PyL9RW4e6TRPjqegFV3IkT95ISkc5gFcZWjOG0.'),
-- Password: password2
('alice', 'alice@example.com', '$2b$10$8A8ArRMjyx5D0QoWwF1Q1Oq98P.CdI2lMiU4fuK1V5ToUQpByMx8a'),
-- Password: password3
('carol', 'carol@example.com', '$2b$10$y6QbqMoNi2Ti05sjAXCEMOVDU6Il8waMTdFSJKD/Rnm0HiGddljnS'),
-- Password: password4
('dan', 'dan@example.com', '$2b$10$.VjCJvUuMF2nh8jxTTxwoOePpH6/.jJzSVSxlQ1YOZcFZ4onVj/zi'),
-- Password: password5
('eve', 'eve@example.com', '$2b$10$Lt65fZ1pMbKNDtzZGP3IRuoWhZYYD8dj6YkwTTKKX9TWppMG0KPF2'),
-- Password: password6
('frank', 'frank@example.com', '$2b$10$AsvIoiwhK3tN7HDpgmuXr.iQACNabArA3ElLFL9hVrDysQUZdQPMq'),
-- Password: password7
('grace', 'grace@example.com', '$2b$10$64ckmHfV9PIrgYncBfaMG.wN5Ix3EM5rrp4z2b.QJNHp0JvT4PZvy'),
-- Password: password8
('heidi', 'heidi@example.com', '$2b$10$H5KyXLZtAoHoUVoQzZmy7e9zOXI3kbljDNp5u5zvNufbrm9exUi3e'),
-- Password: password9
('ivan', 'ivan@example.com', '$2b$10$38TKUlkhTSsCyPfAGBd7tu6lYRI7skOzvV0epcIYf2ks3FZEnncnK'),
-- Password: password10
('judy', 'judy@example.com', '$2b$10$4nIizZUkG4ZMCypC3K8uJeCIeCUi2eZK3S7bKSkBduflAkDyk36qO');

INSERT INTO users (username, email, password_hash)
VALUES
-- Password: password11
('fred', 'fred@example.com', '$2b$10$4nIizZUkG4ZMCypC3K8uJeCIeCUi2eZK3S7bKSjBduflAkDyl36qO');





---------------------------------------------------
------ Bob Data -------
---------------------------------------------------

-- User 1: bob
INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(1, 'Tetris', 12, 8000, '2025-05-01'),
(1, 'Snake', 20, 650, '2025-04-29'),
(1, 'Pong', 8, NULL, NULL),
(1, 'Pacman', 6, 4200, '2025-04-20'),
(1, 'Set', 5, 1900, '2025-03-15'),
(1, 'Yahtzee', 9, NULL, NULL);




---------------------------------------------------
------ Different Data -------
---------------------------------------------------

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(2, 'Tetris', 15, 10200, '2025-04-28'),
(2, 'Snake', 18, 720, '2025-04-30'),
(2, 'Pong', 4, NULL, NULL),
(2, 'Pacman', 10, 3600, '2025-04-25'),
(2, 'Set', 7, 2300, '2025-04-10'),
(2, 'Yahtzee', 6, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(3, 'Tetris', 9, 7500, '2025-05-03'),
(3, 'Snake', 12, 610, '2025-05-02'),
(3, 'Pong', 5, NULL, NULL),
(3, 'Pacman', 8, 4000, '2025-04-19'),
(3, 'Set', 3, 1500, '2025-03-22'),
(3, 'Yahtzee', 4, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(4, 'Tetris', 20, 12000, '2025-05-10'),
(4, 'Snake', 25, 800, '2025-05-09'),
(4, 'Pong', 7, NULL, NULL),
(4, 'Pacman', 13, 5000, '2025-05-05'),
(4, 'Set', 10, 2700, '2025-04-01'),
(4, 'Yahtzee', 8, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(5, 'Tetris', 6, 6200, '2025-04-15'),
(5, 'Snake', 10, 590, '2025-04-14'),
(5, 'Pong', 3, NULL, NULL),
(5, 'Pacman', 7, 4100, '2025-04-13'),
(5, 'Set', 2, 1800, '2025-03-10'),
(5, 'Yahtzee', 5, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(6, 'Tetris', 18, 9000, '2025-04-20'),
(6, 'Snake', 16, 675, '2025-04-18'),
(6, 'Pong', 6, NULL, NULL),
(6, 'Pacman', 9, 4300, '2025-04-16'),
(6, 'Set', 4, 2000, '2025-03-25'),
(6, 'Yahtzee', 7, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(7, 'Tetris', 13, 8450, '2025-04-23'),
(7, 'Snake', 14, 600, '2025-04-21'),
(7, 'Pong', 5, NULL, NULL),
(7, 'Pacman', 11, 3900, '2025-04-20'),
(7, 'Set', 6, 2100, '2025-03-18'),
(7, 'Yahtzee', 6, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(8, 'Tetris', 11, 8100, '2025-05-01'),
(8, 'Snake', 9, 625, '2025-04-30'),
(8, 'Pong', 4, NULL, NULL),
(8, 'Pacman', 5, 3700, '2025-04-15'),
(8, 'Set', 3, 1600, '2025-03-12'),
(8, 'Yahtzee', 5, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(9, 'Tetris', 7, 6800, '2025-04-19'),
(9, 'Snake', 11, 550, '2025-04-18'),
(9, 'Pong', 2, NULL, NULL),
(9, 'Pacman', 6, 3400, '2025-04-17'),
(9, 'Set', 5, 1700, '2025-03-14'),
(9, 'Yahtzee', 3, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(10, 'Tetris', 10, 8600, '2025-04-26'),
(10, 'Snake', 13, 705, '2025-04-25'),
(10, 'Pong', 6, NULL, NULL),
(10, 'Pacman', 8, 4500, '2025-04-22'),
(10, 'Set', 6, 2500, '2025-04-05'),
(10, 'Yahtzee', 7, NULL, NULL);

INSERT INTO game_data (user_id, game_name, play_count, high_score, high_score_date) VALUES
(11, 'Tetris', 16, 9500, '2025-05-04'),
(11, 'Snake', 19, 780, '2025-05-03'),
(11, 'Pong', 7, NULL, NULL),
(11, 'Pacman', 10, 4700, '2025-04-28'),
(11, 'Set', 8, 2600, '2025-04-02'),
(11, 'Yahtzee', 9, NULL, NULL);

CREATE SCHEMA notes;

CREATE TABLE notes (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  program_id BIGSERIAL NOT NULL,
  content TEXT NOT NULL,
  tag VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE SCHEMA subdomain;

CREATE TABLE subdomain (
  id bigserial PRIMARY KEY,
  program_id bigserial NOT NULL,
  url text NOT NULL UNIQUE,
  title text NOT NULL,
  body_hash text NOT NULL,
  tag text NOT NULL,
  ip text NOT NULL,
  port text NOT NULL,
  screenshot text NOT NULL,
  status_code int NOT NULL,
  technologies text NOT NULL,
  content_length int NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

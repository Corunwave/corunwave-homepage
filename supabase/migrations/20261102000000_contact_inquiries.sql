create type public.inquiry_status as enum ('received', 'in_progress', 'done');
create type public.inquiry_email_status as enum ('pending', 'sent', 'failed');

create table public.contact_inquiries (
  id            bigint generated always as identity primary key,
  name          varchar(50)  not null check (char_length(trim(name)) > 0),
  company       varchar(50)  not null check (char_length(trim(company)) > 0),
  email         varchar(254) not null,
  phone         varchar(30)  not null,
  message       text         check (message is null or char_length(message) <= 5000),
  status        public.inquiry_status       not null default 'received',
  email_status  public.inquiry_email_status not null default 'pending',
  email_error   text,
  consented_at  timestamptz  not null,
  ip_address    inet,
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);

create index contact_inquiries_status_created_idx
  on public.contact_inquiries (status, created_at desc);

create function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger contact_inquiries_set_updated_at
  before update on public.contact_inquiries
  for each row execute function public.set_updated_at();

-- No policies: anon/authenticated are denied; the server uses the secret API key, which bypasses RLS.
alter table public.contact_inquiries enable row level security;

-- MANUFAKTURA FLOWERS — SETUP SUPABASE
-- Rulează în SQL Editor → New Query

-- Tabel comenzi
create table if not exists orders (
  id text primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  phone text not null,
  email text,
  address text not null,
  message text,
  delivery_date text,
  delivery_time text,
  payment_method text default 'card',
  items text,
  total integer default 0,
  status text default 'nouă'
    check (status in ('nouă','confirmată','pregătire','livrare','livrată'))
);

-- Permite oricui să insereze comenzi (clienți neautentificați)
alter table orders enable row level security;

create policy "Anyone can insert orders"
  on orders for insert
  with check (true);

create policy "Anyone can read orders by id"
  on orders for select
  using (true);

create policy "Anyone can update status"
  on orders for update
  using (true);

-- Notificări în timp real
alter publication supabase_realtime add table orders;

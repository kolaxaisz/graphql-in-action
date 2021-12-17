-- Listing 6.2 In psql: queries to read data
select * from azdev.users;

select * from azdev.tasks;

select * from azdev.approaches;

-- Don’t include private Task objects.
-- Sorts Tasks by creation date, newest first
-- Limits the results to 100 Task objects
select *
from azdev.tasks
where is_private = false
order by created_at desc
limit 100


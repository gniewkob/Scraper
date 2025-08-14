import asyncio
from logging.config import fileConfig

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

if config.config_file_name is not None:
    try:
        fileConfig(config.config_file_name)
    except Exception:
        pass

from backend.db import get_engine


def run_migrations_offline():
    engine = get_engine()
    url = engine.url.render_as_string(hide_password=False)
    context.configure(url=url, target_metadata=None, literal_binds=True)
    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=None)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online():
    connectable = get_engine()
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())

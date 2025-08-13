import asyncio

from sqlalchemy import text

from backend import db


def test_engine_shared_and_stable(tmp_path):
    url = f"sqlite+aiosqlite:///{tmp_path/'test.db'}"

    async def query():
        engine = db.get_engine(url)
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        return engine

    async def run_test():
        engines = await asyncio.gather(*(query() for _ in range(5)))
        first = engines[0]
        assert all(e is first for e in engines), "get_engine should return shared instance"

        # ensure engine still works after concurrent usage
        async with first.begin() as conn:
            await conn.execute(text("SELECT 1"))

        await db.dispose_engines()

    asyncio.run(run_test())


def test_multiple_engines_not_disposed(tmp_path):
    url1 = f"sqlite+aiosqlite:///{tmp_path/'a.db'}"
    url2 = f"sqlite+aiosqlite:///{tmp_path/'b.db'}"

    async def run_test():
        engine1 = db.get_engine(url1)
        engine2 = db.get_engine(url2)

        assert engine1 is db.get_engine(url1)
        assert engine2 is db.get_engine(url2)
        assert engine1 is not engine2

        # verify both engines remain usable
        async with engine1.begin() as conn1:
            await conn1.execute(text("SELECT 1"))
        async with engine2.begin() as conn2:
            await conn2.execute(text("SELECT 1"))

        await db.dispose_engines()

    asyncio.run(run_test())

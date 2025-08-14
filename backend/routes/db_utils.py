"""Database utilities for handling SQL dialect differences."""

from sqlalchemy.ext.asyncio import AsyncConnection


def get_db_dialect(conn: AsyncConnection) -> str:
    """Get the database dialect name from a connection.
    
    Returns:
        str: 'postgresql', 'sqlite', or other dialect name
    """
    return conn.dialect.name


def date_cast(column: str, conn: AsyncConnection) -> str:
    """Return the appropriate date casting syntax for the current database.
    
    Args:
        column: The column name to cast
        conn: The database connection
        
    Returns:
        str: The appropriate SQL casting syntax
    """
    dialect = get_db_dialect(conn)
    if dialect == 'postgresql':
        return f"{column}::date"
    else:
        # SQLite and other databases - use DATE() function or CAST
        return f"DATE({column})"


def timestamp_cast(column: str, conn: AsyncConnection) -> str:
    """Return the appropriate timestamp casting syntax for the current database.
    
    Args:
        column: The column name to cast
        conn: The database connection
        
    Returns:
        str: The appropriate SQL casting syntax
    """
    dialect = get_db_dialect(conn)
    if dialect == 'postgresql':
        return f"{column}::timestamp"
    else:
        # SQLite stores timestamps as strings, so we can use them directly
        # or use datetime() function if needed
        return f"datetime({column})"


def safe_date_comparison(column: str, conn: AsyncConnection) -> str:
    """Return a safe date comparison that works across databases.
    
    Args:
        column: The column name to compare
        conn: The database connection
        
    Returns:
        str: SQL expression for date comparison
    """
    dialect = get_db_dialect(conn)
    if dialect == 'postgresql':
        return f"{column}::date >= CURRENT_DATE"
    else:
        # SQLite comparison
        return f"DATE({column}) >= DATE('now')"

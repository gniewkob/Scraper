"""Add slug and activity fields to products"""

from alembic import op
import sqlalchemy as sa

revision = "0002_add_product_slug_active"
down_revision = "0001_create_tables"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "products_new",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("slug", sa.String(length=255), nullable=False, unique=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("first_seen", sa.DateTime()),
        sa.Column("last_seen", sa.DateTime()),
    )
    bind = op.get_bind()
    rows = bind.execute(sa.text("SELECT product_id, name FROM products")).fetchall()
    for pid, name in rows:
        dates = bind.execute(
            sa.text(
                "SELECT MIN(fetched_at) AS first_seen, MAX(fetched_at) AS last_seen "
                "FROM pharmacy_prices WHERE product_id = :pid"
            ),
            {"pid": pid},
        ).first()
        bind.execute(
            sa.text(
                "INSERT INTO products_new (slug, name, active, first_seen, last_seen) "
                "VALUES (:slug, :name, 1, :first, :last)"
            ),
            {
                "slug": pid,
                "name": name,
                "first": getattr(dates, "first_seen", None),
                "last": getattr(dates, "last_seen", None),
            },
        )

    op.add_column("pharmacy_prices", sa.Column("product_id_int", sa.Integer(), nullable=True))
    mapping = bind.execute(sa.text("SELECT id, slug FROM products_new")).fetchall()
    for id_, slug in mapping:
        bind.execute(
            sa.text(
                "UPDATE pharmacy_prices SET product_id_int = :id WHERE product_id = :slug"
            ),
            {"id": id_, "slug": slug},
        )
    op.drop_constraint(None, "pharmacy_prices", type_="foreignkey")
    op.drop_column("pharmacy_prices", "product_id")
    op.alter_column(
        "pharmacy_prices",
        "product_id_int",
        new_column_name="product_id",
        existing_type=sa.Integer(),
        nullable=False,
    )
    op.drop_table("products")
    op.rename_table("products_new", "products")
    op.create_foreign_key(None, "pharmacy_prices", "products", ["product_id"], ["id"])


def downgrade():
    op.create_table(
        "products_old",
        sa.Column("product_id", sa.String(length=255), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
    )
    bind = op.get_bind()
    rows = bind.execute(
        sa.text("SELECT id, slug, name FROM products")
    ).fetchall()
    for id_, slug, name in rows:
        bind.execute(
            sa.text(
                "INSERT INTO products_old (product_id, name) VALUES (:pid, :name)"
            ),
            {"pid": slug, "name": name},
        )

    op.add_column("pharmacy_prices", sa.Column("product_id_text", sa.String(length=255), nullable=True))
    for id_, slug, _ in rows:
        bind.execute(
            sa.text(
                "UPDATE pharmacy_prices SET product_id_text = :slug WHERE product_id = :id"
            ),
            {"slug": slug, "id": id_},
        )
    op.drop_constraint(None, "pharmacy_prices", type_="foreignkey")
    op.drop_column("pharmacy_prices", "product_id")
    op.alter_column(
        "pharmacy_prices",
        "product_id_text",
        new_column_name="product_id",
        existing_type=sa.String(length=255),
        nullable=False,
    )
    op.drop_table("products")
    op.rename_table("products_old", "products")
    op.create_foreign_key(None, "pharmacy_prices", "products", ["product_id"], ["product_id"])

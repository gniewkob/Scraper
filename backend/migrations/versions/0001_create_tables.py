"""Initial tables for products and pharmacy_prices"""

from alembic import op
import sqlalchemy as sa

revision = "0001_create_tables"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "products",
        sa.Column("product_id", sa.String(length=255), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
    )
    op.create_table(
        "pharmacy_prices",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("product_id", sa.String(length=255), sa.ForeignKey("products.product_id"), nullable=False),
        sa.Column("pharmacy_name", sa.String(length=255), nullable=False),
        sa.Column("address", sa.String(length=255)),
        sa.Column("price", sa.Float, nullable=False),
        sa.Column("unit", sa.String(length=50)),
        sa.Column("expiration", sa.String(length=50)),
        sa.Column("availability", sa.String(length=50)),
        sa.Column("updated", sa.String(length=50)),
        sa.Column("fetched_at", sa.String(length=50), nullable=False),
        sa.Column("map_url", sa.String(length=255)),
    )


def downgrade():
    op.drop_table("pharmacy_prices")
    op.drop_table("products")

"""Initial database schema"""

from alembic import op
import sqlalchemy as sa

revision = "0001_create_tables"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        "products",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("slug", sa.String(length=255), nullable=False, unique=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("first_seen", sa.DateTime()),
        sa.Column("last_seen", sa.DateTime()),
    )
    op.create_index("ix_products_active", "products", ["active"])

    op.create_table(
        "pharmacy_prices",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("product_id", sa.Integer, sa.ForeignKey("products.id"), nullable=False),
        sa.Column("pharmacy_name", sa.String(length=255), nullable=False),
        sa.Column("address", sa.String(length=255)),
        sa.Column("price", sa.Float),
        sa.Column("unit", sa.String(length=50)),
        sa.Column("expiration", sa.String(length=50)),
        sa.Column("fetched_at", sa.String(length=50), nullable=False),
        sa.Column("availability", sa.String(length=50)),
        sa.Column("updated", sa.String(length=50)),
        sa.Column("map_url", sa.String(length=255)),
        sa.Column("pharmacy_lat", sa.Float),
        sa.Column("pharmacy_lon", sa.Float),
        sa.UniqueConstraint(
            "product_id",
            "pharmacy_name",
            "price",
            "expiration",
            "fetched_at",
        ),
    )

    op.create_table(
        "user_alerts",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("product_id", sa.Integer, nullable=False),
        sa.Column("threshold", sa.Float, nullable=False),
        sa.Column("email_encrypted", sa.Text),
        sa.Column("phone_encrypted", sa.Text),
        sa.Column("created", sa.Text),
        sa.Column("token", sa.Text),
        sa.Column("confirmed", sa.Integer, server_default="0"),
    )

    op.create_table(
        "product_type_mapping",
        sa.Column("product_id", sa.Text, primary_key=True),
        sa.Column("product_type", sa.Text),
    )

    op.create_table(
        "price_thresholds",
        sa.Column("product_type", sa.Text),
        sa.Column("super_deal", sa.Float),
        sa.Column("deal", sa.Float),
        sa.Column("normal", sa.Float),
        sa.Column("updated_at", sa.Text),
    )

    op.create_table(
        "price_statistics",
        sa.Column("product", sa.Text),
        sa.Column("min_price", sa.Float),
        sa.Column("calculated_at", sa.Text),
    )


def downgrade():
    op.drop_table("price_statistics")
    op.drop_table("price_thresholds")
    op.drop_table("product_type_mapping")
    op.drop_table("user_alerts")
    op.drop_table("pharmacy_prices")
    op.drop_index("ix_products_active", table_name="products")
    op.drop_table("products")

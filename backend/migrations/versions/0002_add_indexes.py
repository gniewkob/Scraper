"""Add performance indexes for pharmacy_prices"""

from alembic import op

revision = "0002_add_indexes"
down_revision = "0001_create_tables"
branch_labels = None
depends_on = None


def upgrade():
    op.create_index(
        "ix_prices_product_expiration",
        "pharmacy_prices",
        ["product_id", "expiration"],
    )
    op.create_index(
        "ix_prices_product_fetched",
        "pharmacy_prices",
        ["product_id", "fetched_at"],
    )


def downgrade():
    op.drop_index("ix_prices_product_fetched", table_name="pharmacy_prices")
    op.drop_index("ix_prices_product_expiration", table_name="pharmacy_prices")


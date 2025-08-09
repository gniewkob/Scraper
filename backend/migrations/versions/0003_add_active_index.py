"""Add index on products.active"""

from alembic import op
import sqlalchemy as sa

revision = "0003_add_active_index"
down_revision = "0002_add_product_slug_active"
branch_labels = None
depends_on = None


def upgrade():
    op.create_index("ix_products_active", "products", ["active"])


def downgrade():
    op.drop_index("ix_products_active", table_name="products")

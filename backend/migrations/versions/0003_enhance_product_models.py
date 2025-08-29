"""Enhance product models for frontend integration

Add missing fields needed by the React frontend:
- strain_type, thc_content, cbd_content to products
- distance, availability_status, pharmacy_rating to pharmacy_prices
"""

from alembic import op
import sqlalchemy as sa

revision = "0003_enhance_product_models"
down_revision = "0002_add_indexes"
branch_labels = None
depends_on = None

def upgrade():
    # Add new columns to products table
    op.add_column("products", sa.Column("strain_type", sa.String(length=50), nullable=True))
    op.add_column("products", sa.Column("thc_content", sa.Float, nullable=True))
    op.add_column("products", sa.Column("cbd_content", sa.Float, nullable=True))
    op.add_column("products", sa.Column("category", sa.String(length=100), nullable=True))
    op.add_column("products", sa.Column("image_url", sa.String(length=500), nullable=True))
    
    # Add new columns to pharmacy_prices table
    op.add_column("pharmacy_prices", sa.Column("distance", sa.Float, nullable=True))
    op.add_column("pharmacy_prices", sa.Column("availability_status", sa.String(length=50), nullable=True))
    op.add_column("pharmacy_prices", sa.Column("pharmacy_rating", sa.Float, nullable=True))
    op.add_column("pharmacy_prices", sa.Column("delivery_options", sa.String(length=200), nullable=True))
    
    # Create indexes for new fields
    op.create_index("ix_products_strain_type", "products", ["strain_type"])
    op.create_index("ix_products_thc_content", "products", ["thc_content"])
    op.create_index("ix_products_cbd_content", "products", ["cbd_content"])
    op.create_index("ix_pharmacy_prices_distance", "pharmacy_prices", ["distance"])
    op.create_index("ix_pharmacy_prices_availability", "pharmacy_prices", ["availability_status"])
    op.create_index("ix_pharmacy_prices_rating", "pharmacy_prices", ["pharmacy_rating"])

def downgrade():
    # Remove indexes
    op.drop_index("ix_pharmacy_prices_rating", table_name="pharmacy_prices")
    op.drop_index("ix_pharmacy_prices_availability", table_name="pharmacy_prices")
    op.drop_index("ix_pharmacy_prices_distance", table_name="pharmacy_prices")
    op.drop_index("ix_products_cbd_content", table_name="products")
    op.drop_index("ix_products_thc_content", table_name="products")
    op.drop_index("ix_products_strain_type", table_name="products")
    
    # Remove columns from pharmacy_prices
    op.drop_column("pharmacy_prices", "delivery_options")
    op.drop_column("pharmacy_prices", "pharmacy_rating")
    op.drop_column("pharmacy_prices", "availability_status")
    op.drop_column("pharmacy_prices", "distance")
    
    # Remove columns from products
    op.drop_column("products", "image_url")
    op.drop_column("products", "category")
    op.drop_column("products", "cbd_content")
    op.drop_column("products", "thc_content")
    op.drop_column("products", "strain_type")



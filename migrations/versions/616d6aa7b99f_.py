"""empty message

Revision ID: 616d6aa7b99f
Revises: 
Create Date: 2024-02-23 23:36:58.695822

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '616d6aa7b99f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('forms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('wallet_address', sa.String(length=40), nullable=False),
    sa.Column('last_nft', sa.String(length=64), nullable=True),
    sa.Column('why', sa.String(length=250), nullable=True),
    sa.Column('twitter', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('wallet_address')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE forms SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")    


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('forms')
    # ### end Alembic commands ###

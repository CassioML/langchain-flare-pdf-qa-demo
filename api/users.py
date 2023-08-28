# Cassio interaction with the DB

import uuid

from cassio.table import ClusteredCassandraTable

USER_TABLE_NAME = "flare_users"

userStore = None

def get_user_store(db, ks):
    global userStore
    if userStore is None:
        userStore = ClusteredCassandraTable(
            session=db,
            keyspace=ks,
            table=USER_TABLE_NAME,
            primary_key_type=["TEXT", "TIMEUUID"],
            ordering_in_partition="DESC",
        )
    return userStore

def files_for_user(user_store, user_id):
    return [
        row["body_blob"]
        for row in user_store.get_partition(
            partition_id=user_id,
        )
    ]

def add_file_to_user(user_store, user_id, file_name):
    entry_id = uuid.uuid1()
    user_store.put(
        partition_id=user_id,
        row_id=entry_id,
        body_blob=file_name
    )

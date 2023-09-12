# Cassio interaction with the DB
import json

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
            primary_key_type=["TEXT", "TEXT"],
            ordering_in_partition="ASC",
        )
    return userStore

def files_for_user(user_store, user_id):
    return [
        json.loads(row["body_blob"])
        for row in user_store.get_partition(
            partition_id=user_id,
        )
    ]

def add_file_to_user(user_store, user_id, file_name, file_url):
    blob = json.dumps({"name": file_name, "url": file_url})
    user_store.put(
        partition_id=user_id,
        row_id=file_name,
        body_blob=blob,
    )

def delete_file_from_user(user_store, user_id, file_name):
    user_store.delete(
        partition_id=user_id,
        row_id=file_name,
    )

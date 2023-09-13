import os
from dotenv import load_dotenv

from cassandra.cluster import (
    Cluster,
)
from cassandra.auth import PlainTextAuthProvider


load_dotenv("../.env")

dbSession = None
_cSession = None

def get_db_session():
    global dbSession
    # A separate route for a Cassandra cluster session
    use_cassandra = int(os.environ.get("USE_CASSANDRA_CLUSTER", "0"))
    if use_cassandra != 0:
        return get_cassandra_session_keyspace()

    # this is the standard Astra DB path:
    ASTRA_DB_SECURE_BUNDLE_PATH = os.environ["ASTRA_DB_SECURE_BUNDLE_PATH"]
    ASTRA_DB_CLIENT_ID = "token"
    ASTRA_DB_APPLICATION_TOKEN = os.environ["ASTRA_DB_APPLICATION_TOKEN"]
    ASTRA_DB_KEYSPACE = os.environ["ASTRA_DB_KEYSPACE"]
    if dbSession is None:
        cluster = Cluster(
            cloud={
                "secure_connect_bundle": ASTRA_DB_SECURE_BUNDLE_PATH,
            },
            auth_provider=PlainTextAuthProvider(
                ASTRA_DB_CLIENT_ID,
                ASTRA_DB_APPLICATION_TOKEN,
            ),
        )
        dbSession = cluster.connect()
        print("Astra DB session created.")
    return dbSession, ASTRA_DB_KEYSPACE


def get_cassandra_session_keyspace():
    global _cSession
    contact_points = [
        cp.strip()
        for cp in os.environ.get("CASSANDRA_CONTACT_POINTS", "").split(',')
        if cp.strip()
    ]
    CASSANDRA_KEYSPACE = os.environ["CASSANDRA_KEYSPACE"]
    CASSANDRA_USERNAME = os.environ.get("CASSANDRA_USERNAME")
    CASSANDRA_PASSWORD = os.environ.get("CASSANDRA_PASSWORD")
    #
    if CASSANDRA_USERNAME and CASSANDRA_PASSWORD:
        auth_provider = PlainTextAuthProvider(
            CASSANDRA_USERNAME,
            CASSANDRA_PASSWORD,
        )
    else:
        auth_provider = None
    #
    if _cSession is None:
        c_cluster = Cluster(contact_points if contact_points else None, auth_provider=auth_provider)
        _cSession = c_cluster.connect()
        print("Cassandra session created.")
    return _cSession, CASSANDRA_KEYSPACE

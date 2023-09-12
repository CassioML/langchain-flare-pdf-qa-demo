import os
from dotenv import load_dotenv

from cassandra.cluster import (
    Cluster,
)
from cassandra.auth import PlainTextAuthProvider


load_dotenv("../.env")

astraSession = None


def get_astra():
    global astraSession
    ASTRA_DB_SECURE_BUNDLE_PATH = os.environ["ASTRA_DB_SECURE_BUNDLE_PATH"]
    ASTRA_DB_CLIENT_ID = "token"
    ASTRA_DB_APPLICATION_TOKEN = os.environ["ASTRA_DB_APPLICATION_TOKEN"]
    ASTRA_DB_KEYSPACE = os.environ["ASTRA_DB_KEYSPACE"]
    if astraSession is None:
        cluster = Cluster(
            cloud={
                "secure_connect_bundle": ASTRA_DB_SECURE_BUNDLE_PATH,
            },
            auth_provider=PlainTextAuthProvider(
                ASTRA_DB_CLIENT_ID,
                ASTRA_DB_APPLICATION_TOKEN,
            ),
        )
        astraSession = cluster.connect()
    return astraSession, ASTRA_DB_KEYSPACE

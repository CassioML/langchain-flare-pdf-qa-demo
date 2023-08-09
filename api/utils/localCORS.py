# Demo-mode to enable React client to axios request an API (both on localhost)
# Not suitable for production.
from fastapi.middleware.cors import CORSMiddleware


def permitReactLocalhostClient(app):
  app.add_middleware(
      CORSMiddleware,
      allow_origins=['http://localhost:3000'],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )

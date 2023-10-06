import os
import sys

from db import set_db_session
from ai import (
    get_embeddings,
    get_vectorstore,
    load_pdf_from_file,
)
from users import (
    get_user_store,
    add_file_to_user,
)


if __name__ == '__main__':
    user_id = sys.argv[1]
    pdf_filepaths = sys.argv[2:]
    print(f"Trying to import {', '.join(pdf_filepaths)} as user '{user_id}' ...")
    #
    set_db_session()
    embeddings = get_embeddings()
    user_store = get_user_store()
    vectorstore_u = get_vectorstore(embeddings, user_id=user_id)
    print("DB Connection established.")
    #
    for pdf_filepath in pdf_filepaths:
        _, file_title = os.path.split(pdf_filepath)
        print(f"* Starting {file_title} ...")
        n_rows = load_pdf_from_file(pdf_filepath, vectorstore_u)
        if n_rows is not None:
            add_file_to_user(user_store, user_id, file_title, "#")
            print(f"* Success ({n_rows} rows inserted).")
        else:
            print(f"* Errored/nothing inserted.")
    print("\nFinished.")

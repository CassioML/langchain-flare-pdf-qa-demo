# PDF FLARE demo with Langchain and Cassandra as Vector Store

Ingest your PDFs and use FLARE for sophisticated multi-step question answering
over the documents' content.

## How-to

Python `3.8+` (suggested: a virtual environment).

Install the dependencies in `requirements.txt`.

Get an [Astra DB](https://astra.datastax.com) vector database (for free), download the Secure Connect Bundle and get a DB Administrator token.
(More info [here](https://cassio.org/start_here/#create-the-database).)

Get an OpenAI API Key.
(More info [here](https://cassio.org/start_here/#llm-access), note that out-of-the-box this demo supports OpenAI unless you tinker with the code.)

Copy `cp .env.template .env` and set the secrets. Then `. .env`

### Load documents

Get some PDF documents in `sources/`.

Run `python load.py`. This can be done just once.

### Ask questions

Ask any question (in double quotes if it contains `bash`-special characters):

```
python flare_query.py Provide a detailed breakdown of the needs of an \
     elderly person according to the studies available
```

Example output (the FLARE result, based on the provided documents, is compared with a "vanilla" LLM run):

```
QUERY: Provide a detailed breakdown of the needs of an elderly person
according to the studies available


FLARE RESULT:
     According to the studies available, 64% of elderly people need help
     with bathing, 57% need assistance walking, 48% need help with dressing
     and grooming, 40% need help using the restroom, and 19% require
     assistance eating, but can generally swallow independently. Assisted
     living communities are prepared to assist seniors with various common
     comorbidities, such as dementia, diabetes, and hypertension. 


LLM RESULT:

1. Physical Needs: 

• Adequate nutrition and hydration - Studies have shown that elderly people
  need to maintain a healthy, balanced diet to prevent malnutrition and
  dehydration, as well as to help manage chronic health conditions. 
• Access to medical care - Studies have found that elderly people need access
  to medical care in order to manage their health conditions and stay healthy. 
• Home safety and assistive devices - Studies have shown that elderly people
  need to have their homes equipped with safety features and assistive devices
  to help them stay safe and independent. 
• Exercise - Studies have shown that elderly people need to maintain an active
  lifestyle to stay healthy and fit. 
• Social activities - Studies have shown that elderly people need to have
  access to social activities to prevent loneliness and depression.

2. Emotional Needs: 

• Companionship - Studies have found that elderly people need to have
  companionship in order to feel connected and supported. 
• Respect - Studies have shown that elderly people need to feel respected
  and valued in order to maintain a sense of self-worth. 
• Independence - Studies have shown that elderly people need to have a sense
  of independence and autonomy in order to
```

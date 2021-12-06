from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html', utc_now=datetime.utcnow())


if __name__ == '__main__':
    app.run()

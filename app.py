# Dataset - https://github.com/falgun23/3_color_detection/blob/main/colors.csv

import cv2
import pandas as pd
from flask import Flask, flash, request, redirect, url_for, render_template,jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route("/")             #HomePage
def uploader():
    path = 'static/uploads/'
    uploads = sorted(os.listdir(path), key=lambda x: os.path.getctime(
        path+x))        # Sorting as per image upload date and time
    print(uploads)
    
    uploads = ['uploads/' + file for file in uploads]
    uploads.reverse()
    
    # Pass filenames to front end for display in 'uploads' variable
    return render_template("index1.html", uploads=uploads)


app.config['UPLOAD_FOLDER'] = 'static/uploads'             # Storage path

@app.route("/upload", methods=['GET', 'POST'])
def upload_file(): 
    # This method is used to upload files
    if request.method == 'POST':
        f = request.files['file']
        
        filename = secure_filename(f.filename)
        f.save('static/uploads/colorspic.jpg')
        
        # Redirect to route '/' for displaying images on front end
        return redirect("/")

@app.route('/test/<x>/<y>')
def color_detect1(x,y):
    img_path = r'static/uploads/colorspic.jpg'
    img = cv2.imread(img_path)
    r = g = b = 0
    x,y = int(x),int(y)
    b, g, r = img[y, x]
    b = int(b)
    g = int(g)
    r = int(r)
    def get_color_name(R, G, B):
        minimum = 10000
        index = ["color", "color_name", "hex", "R", "G", "B"]
        csv = pd.read_csv('./colors.csv', names=index, header=None)
        for i in range(len(csv)):
            d = abs(R - int(csv.loc[i, "R"])) + abs(G - int(csv.loc[i, "G"])) + abs(B - int(csv.loc[i, "B"]))
            if d <= minimum:
                minimum = d
                cname = csv.loc[i, "color_name"]
        return cname
    data = {'colorName':get_color_name(r, g, b) ,"R":str(r),"G":str(g),"B":str(b)}
    return jsonify(data)

if __name__ == '__main__':
   app.run(debug=True)
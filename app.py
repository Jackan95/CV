from flask import Flask, redirect, render_template, request, session, flash, url_for
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a secure key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    comments = db.relationship('Comment', backref='author', lazy=True)

# Comment model
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


@login_manager.user_loader
def load_user(user_id):
    print(f"Loading user: {user_id}")
    return User.query.get(int(user_id))

@app.route('/', methods=['GET', 'POST'])
@login_required
def index():
    """if request.method == 'POST':
        content = request.form['comment']
        
        comment = Comment(content=content, author=current_user)
        db.session.add(comment)
        db.session.commit()
        flash('Comment submitted!', 'success')
        return redirect(url_for('index'))"""
    
    # For GET request, load the three most recent comments
    comments = Comment.query.order_by(Comment.id.desc()).limit(3).all()
    return render_template('index.html', username=current_user.username, comments=comments)

@app.route('/submit_comment', methods=['POST'])
@login_required
def submit_comment():
    content = request.form['comment']
    
    # Create a new comment
    comment = Comment(content=content, author=current_user)
    db.session.add(comment)
    db.session.commit()

    # Load the three most recent comments after the new one is added
    comments = Comment.query.order_by(Comment.id.desc()).limit(3).all()
    
    # Render only the comment section
    return render_template('comments.html', comments=comments)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password , password):
            print(f"Logging in user: {user.id}")
            login_user(user)
            print(f"Session data after login: {session}")
            flash('Login successful!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password', 'danger')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirmation = request.form['confirmation']
        if not username:
            flash('Username is required.', 'danger')
            return render_template('register.html')
        if not password:
            flash('Password is required.', 'danger')
            return render_template('register.html')
        if password != confirmation:
            flash('Passwords do not match.', 'danger')
            return render_template('register.html')
        
        if User.query.filter_by(username=username).first():
            flash('Username is already taken.', 'danger')
            return render_template('register.html')

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        flash('Your account has been created!', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))



if __name__ == '__main__':
    
    app.run(debug=True)
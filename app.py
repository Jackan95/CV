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
    if request.method == 'POST':
        content = request.form['comment']
        
        comment = Comment(content=content, author=current_user)
        db.session.add(comment)
        db.session.commit()
        flash('Comment submitted!', 'success')
        return redirect(url_for('index'))
    
    # For GET request, load the three most recent comments
    comments = Comment.query.order_by(Comment.id.desc()).limit(3).all()
    return render_template('index.html', username=current_user.username, comments=comments)


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

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))


def add_initial_data():
    # Add initial users
    if not User.query.filter_by(username='user1').first():
        user1 = User(username='user1', password=generate_password_hash('password1'))
        db.session.add(user1)
    if not User.query.filter_by(username='user2').first():
        user2 = User(username='user2', password=generate_password_hash('password2'))
        db.session.add(user2)
    db.session.commit()

    # Add initial comments
    user1 = User.query.filter_by(username='user1').first()
    user2 = User.query.filter_by(username='user2').first()
    if user1 and not Comment.query.filter_by(content='This is a comment from user1').first():
        comment1 = Comment(content='This is a comment from user1', author=user1)
        db.session.add(comment1)
    if user2 and not Comment.query.filter_by(content='This is a comment from user2').first():
        comment2 = Comment(content='This is a comment from user2', author=user2)
        db.session.add(comment2)
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the database tables
        add_initial_data() 
    app.run(debug=True)
#!/usr/bin/python
# -*- coding: UTF-8 -*-

from __future__ import unicode_literals

import pymysql
from flask import (Flask, render_template, g, session, redirect, url_for,
                   request, flash)
from flask_bootstrap import Bootstrap
from werkzeug.exceptions import abort

from forms import InsertExceptionListForm, ModifyExceptionListForm, RegistrationForm

SECRET_KEY = 'key'
app = Flask(__name__)
bootstrap = Bootstrap(app)
app.secret_key = SECRET_KEY


def connect_db():
    """Returns a new connection to the database."""
    return pymysql.connect(host='127.0.0.1',
                           user='root',
                           passwd='xxxxxx',
                           db='exception',
                           charset="utf8")


@app.before_request
def before_request():
    """Make sure we are connected to the database each request."""
    g.db = connect_db()


@app.after_request
def after_request(response):
    """Closes the database again at the end of the request."""
    g.db.close()
    return response


@app.route('/', methods=['GET', 'POST'])
def show_exception_list():
    if not session.get('logged_in'):
        return redirect(url_for('login'))

    form = InsertExceptionListForm()
    if request.method == 'GET':
        sql = 'SELECT exceptionId,exceptionName,exceptionDesc,exceptionExample FROM exception.exception;'
        with g.db as cur:
            cur.execute(sql)
            exception_list = [dict(exceptionId=row[0], exceptionName=row[1], exceptionDesc=row[2], exceptionExample=row[3])
                         for row in cur.fetchall()]
        return render_template('index.html', exception_list=exception_list, form=form)
    else:
        if form.validate_on_submit():
            exception_name = form.exception_name.data
            exception_desc = form.exception_desc.data
            exception_example = form.exception_example.data
            hit = form.hit.data
            with g.db as cur:
                sql = """insert into exception(`exceptionName`, `exceptionDesc`, 
                `exceptionExample`,`hit`) values ('{0}','{1}','{2}',{3})""".format(
                    exception_name, exception_desc, exception_example, hit)
                cur.execute(sql)
            flash('add a new exception！')
        else:
            flash(form.errors)
        return redirect(url_for('show_exception_list'))


@app.route('/delete')
def delete_exception_list():
    id = request.args.get('id', None)
    if id is None:
        abort(404)
    else:
        sql = 'delete from exception where id = {0}'.format(id)
        with g.db as cur:
            cur.execute(sql)
        flash('delete a exception ！')
        return redirect(url_for('show_exception_list'))


@app.route('/modify', methods=['GET', 'POST'])
def modify_exception_list():
    id = request.args.get('id', None)
    form = ModifyExceptionListForm()
    if request.method == 'GET':
        sql = 'SELECT exceptionId,exceptionName,exceptionDesc,exceptionExample FROM exception.exception;'
        with g.db as cur:
            cur.execute(sql)
            exception_list = [dict(exceptionId=row[0], exceptionName=row[1], exceptionDesc=row[2], exceptionExample=row[3])
                         for row in cur.fetchall()]
        return render_template('modify.html', exception_list=exception_list, form=form)
    else:
        if form.validate_on_submit():
            # id = request.args.get('id', None)
            exception_name = form.exception_name.data
            exception_desc = form.exception_desc.data
            exception_example = form.exception_example.data
            hit = form.hit.data
            with g.db as cur:
                sql = """insert into exception(`exceptionName`, `exceptionDesc`, 
                            `exceptionExample`,`hit`) values ('{0}','{1}','{2}',{3})""".format(
                    exception_name, exception_desc, exception_example, hit)
                cur.execute(sql)
            sql = """update exception set exception_name = '{0}', exception_desc = {1},
                  exception_example={2} where id = {2}""".format(exception_name, exception_desc, exception_example)
            with g.db as cur:
                cur.execute(sql)
            flash('update a exception ！')
        else:
            flash(form.errors)
        return redirect(url_for('show_exception_list'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        sql = "SELECT userId, userName, userPassword FROM user"
        with g.db as cur:
            cur.execute(sql)
            user_list = [dict(id=row[0], user_name=row[1], user_password=row[2]) for
                         row in cur.fetchall()]
        for user in user_list:
            if request.form['username'] != user['user_name']:
                flash('请输入正确的用户名 ！')
            elif request.form['password'] != user['user_password']:
                flash('请输入正确的密码 ！')
            else:
                session['logged_in'] = True
                flash('成功登录系统 !')
                return redirect(url_for('show_exception_list'))
    return render_template('login.html', error=error)


@app.route('/register', methods=['GET', 'POST'])
def register():
    error = None
    form = RegistrationForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            user_name = form.user_name.data
            user_password = form.user_password.data
            sql = """INSERT INTO user (`userName`, `userPassword`
            ) VALUES ('{0}' , '{1}')""".format(user_name, user_password)
            with g.db as cur:
                cur.execute(sql)
        else:
            flash(form.errors)
        return render_template('login.html', error=error)
    return render_template('register.html', form=form, error=error)


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('成功登出系统 !')
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)

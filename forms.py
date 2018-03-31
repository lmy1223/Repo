#!/usr/bin/python
# -*- coding: UTF-8 -*-

from __future__ import unicode_literals
from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, PasswordField
from wtforms.validators import DataRequired, Length, Regexp, EqualTo


class InsertExceptionListForm(FlaskForm):
    exception_name = StringField('exception_name', validators=[DataRequired(), Length(1, 45)])
    exception_desc = StringField('exception_desc', validators=[DataRequired(), Length(1, 500)])
    exception_example = StringField('exception_example', validators=[DataRequired(), Length(1, 200)])
    hit = StringField('hit', validators=[DataRequired()], default=0)
    submit = SubmitField('添加')


class ModifyExceptionListForm(FlaskForm):
    exception_name = StringField('exception_name', validators=[DataRequired(), Length(1, 45)])
    exception_desc = StringField('exception_desc', validators=[DataRequired(), Length(1, 500)])
    exception_example = StringField('exception_example', validators=[DataRequired(), Length(1, 200)])
    submit = SubmitField('修改')


class RegistrationForm(FlaskForm):
    # email = StringField('Email', validators=[Required(), Length(1, 64),
    #                                        Email()])
    user_name = StringField('用户名', validators=[
        DataRequired(), Length(1, 64), Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0,
                                          '用户名只能包含字母，数组，点 或下划线')])
    user_password = PasswordField('密码', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match.')])
    password2 = PasswordField('Confirm password', validators=[DataRequired()])
    submit = SubmitField('注册')

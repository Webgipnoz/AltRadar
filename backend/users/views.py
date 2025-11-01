from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm

from .forms import CustomUserCreationForm

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = CustomUserCreationForm()
    return render(request, 'users/register.html' , {'form' : form})    

def user_login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)     
            messages.success(request, f"Hello, {user.username}")
            return redirect('home')
        else:
            messages.error(request, 'psw is error')
    else:
        form = AuthenticationForm()
    return render(request, 'users/login.html' , {'form' : form})        

def user_logout(request):
    logout(request)
    return redirect('login')
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  #Access-Control-Allow-Origin: *
 # Access-Control-Allow-Origin: http://www.bcliquorstores.com
 #response.headers['http://www.bcliquorstores.com'] = 'http://www.bcliquorstores.com'
  #before_filter :set_headers

  # private

  # def set_headers
  # #	headers['Access-Control-Allow-Credentials'] = true
  #   headers['Access-Control-Allow-Origin'] = "*"
  #   # headers['Access-Control-Expose-Headers'] = 'ETag'
  #   # headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
  #   # headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match'
  #   # headers['Access-Control-Max-Age'] = '86400'
  # end

end

POST - /signup - user signup 
POST - /login - user login
------/socialsignup- user social sign up
------/sociallogin- user social login
GET - /company/all - company show all
/company/show/:id - company show

/api - protected route
  /user/:jwt = user profile

  POST /candidate/create - candidate create
  PUT /candidate/edit/:id - candidate edit
  /candidate/approve/:id - candidate approve
  /candidate/:id - candidate show
  /candidate/all - candidate show all

  /company/create - company create
  /company/edit/:id - company basic edit
  
  
  /news/create - news create
  /news/edit/:cId/:id - news edit
  /news/delete/:cId/:id - news delete
  /news/all/:cId - news show all
  
  /event/create - event create
  /event/edit/:cId/:id - event edit
  /event/delete/:cId/:id- event delete
  /event/all/:cId- event show all


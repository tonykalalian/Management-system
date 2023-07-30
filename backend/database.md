# Users
|id|
|username|
|fname|
|lname|
|password|
|lastLogin|
|role(super admin, admin, data entry)|

# News
|object_id|
|category_id :Object_id:Category|
|title|
|content|
|date|
|addedBy:user->object_id|

# Category
|object_id|
|code|
|title|

# NewsPicture
|objectid|
|news_id:objectid of collections news|
|filepath|
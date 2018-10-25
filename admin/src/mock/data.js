import Mock from 'mockjs'

let data = {
  users: [
    {id: 1, username: 'a', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 2, username: 'b', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 3, username: 'c', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 4, username: 'd', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 5, username: 'e', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 6, username: 'f', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 7, username: 'g', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 8, username: 'h', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 9, username: 'i', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 10, username: 'j', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 11, username: 'k', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 12, username: 'l', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 13, username: 'm', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 14, username: 'n', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 15, username: 'o', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 16, username: 'p', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 17, username: 'q', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 18, username: 'r', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 19, username: 's', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 20, username: 't', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 21, username: 'u', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 22, username: 'v', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 23, username: 'w', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 24, username: 'x', password: '123456', avatar: '@image', nickname: 'name', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null}
    ],
  types: [
    {id: 1, name: 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 2, name: 'b', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 3, name: 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 4, name: 'd', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 5, name: 'e', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 6, name: 'f', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 7, name: 'g', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null}
  ],
  posts: [
    {id: 1, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 2, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 3, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 4, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 5, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 6, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 7, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 8, title: 'a', 'type_id|1-28': 1, 'type|1': 'b', 'user_id|1-10': 1, 'user|1': 'c', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null}
  ],
  comments: [
    {id: 1, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 2, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 3, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 4, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 5, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 6, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 7, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 8, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 9, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 10, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 11, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 12, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 13, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 14, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 15, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 16, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null},
    {id: 17, body: 'c', 'post_id|1-28': 1, 'post|1': 'post', 'user_id|1-10': 1, 'user|1': 'a', created_at: '2014-01-02', updated_at: '2014-01-02', deleted_at: null}
  ]
};

data.users[0].username = 'admin'; // default user


data.choices = resource => {
  let ret = []
  let models = data[resource]
  for (let k in models) {
    ret.push({ text: models[k].name, value: models[k].id })
  }
  return ret
}

export default data

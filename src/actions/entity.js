import axios from 'axios';
import HttpClient, { BASE_API } from './http-client';

export const getEntityList = (entity, data, token) => {
  return new HttpClient().get(entity, {params: data, cancelToken: token});
};
export const getEntity = (entity, data) => {
  return new HttpClient().get(entity, {params: data});
};

// export const postEntity = (entity, data) => {
//   var config = {
//     headers: {'Content-Type': 'multipart/form-data'},
//   };
//   var fd = new FormData();
//   Object.keys(data).map((key, value) => {
//     return fd.set(key, data[key]);
//   });
//   return new HttpClient().post(BASE_API + entity, fd, config);
// };

export const postEntity = (entity, data) => {
  var config = {
    headers: {'Content-Type': 'multipart/form-data'},
  };
  var fd = new FormData();
  Object.keys(data).map((key, value) => {
    console.log(key, data[key])

    if(data[key] instanceof Array) {
      data[key].forEach((element, index)  => {
        if (element instanceof Object) {
          for (let childKey in element) {
            fd.append(`${key}[${index}][${childKey}]`, element[childKey]);
          }
        } else {
          fd.append(`${key}[]`, element);
        }
      })

      return;
    }

    return fd.set(key, data[key]);
  });
  return new HttpClient().post(BASE_API + entity, fd, config);
};


export const postJsonEntity = (entity, data) => {
  return new HttpClient().post(entity, data);
};
// export const putEntity = (entity, data) => {
//   var config = {
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//   };

//   var formBody = [];
//   for (var property of Object.keys(data)) {
//     var encodedKey = encodeURIComponent(property);
//     var encodedValue = encodeURIComponent(data[property]);
//     formBody.push(encodedKey + '=' + encodedValue);
//   }
//   formBody = formBody.join('&');

//   var fd = new FormData();
//   Object.keys(data).map((key, value) => {
//     return fd.set(key, data[key]);
//   });
//   return new HttpClient().put(entity, formBody, config);
// };

export const putEntity = (entity, data) => {
  var config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  };

  var formBody = JSON_to_URLEncoded(data)

  return new HttpClient().put(entity, formBody, config);
};


function JSON_to_URLEncoded(element,key,list){
  var list = list || [];
  if(typeof(element)=='object'){
    for (var idx in element)
      JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
  } else {
    list.push(key+'='+encodeURIComponent(element));
  }
  return list.join('&');
}

export function showError(data){
  var first = {};
  for(var key in data){
      if(data.hasOwnProperty(key)){
          first.key = key;
          first.content =  data[key];
          break;
      }
  }
  return first.content[0] || 0
}

var library = [ 
    {
        "title":  "The Road Ahead",
        "author": "Bill Gates",
        "libraryID": 1254
    },
    {
        "title": "Walter Isaacson",
        "author": "Steve Jobs",
        "libraryID": 4264
    },
    {
        "title": "Mockingjay: The Final Book of The Hunger Games",
        "author": "Suzanne Collins",
        "libraryID": 3245
    }];
   
    library.sort(function(a, b) {
        return (a.libraryID - b.libraryID)*-1;
    });

  var ordered = {};

  for(i=0;i<library.length;i++){
  
    Object.keys(library[i]).sort().forEach(function(key) { ordered[key] = library[i][key];});
    
    console.log(ordered);
  }
  
  
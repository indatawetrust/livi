curl -XPUT "http://localhost:9200/movies/movie/#index" -d'
{
      "title": "#item.name",
          "director": "Francis Ford Coppola",
              "year": 1972,
                  "genres": ["Crime", "Drama"]
                }'

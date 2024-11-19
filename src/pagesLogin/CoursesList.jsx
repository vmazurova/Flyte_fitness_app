import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function CourseList() {
  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/courses?populate=*");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const courses = data?.data ?? []; // Zajištění, že `courses` je vždy pole

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => {
            const imageUrl = course.image?.[0]?.url
              ? `http://localhost:1337${course.image[0].url}`
              : "https://via.placeholder.com/400x200";

            return (
              <Card
                key={course.id}
                className="shadow-200 bg-gray-800 w-full max-w-[400px] mx-auto"
              >
                <CardHeader
                  color="transparent"
                  className="relative h-60 bg-gradient-to-r from-purple-500 to-purple-700"
                >
                  <img
                    src={imageUrl}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="white"
                    className="mb-2 truncate"
                  >
                    {course.title}
                  </Typography>
                  <Typography color="gray" className="text-sm line-clamp-3">
                    {course.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-4 text-center">
                  <Link to={`/detail/${course.id}`}>
                    <button className="px-8 py-3 bg-purple-600 text-white rounded hover:bg-purple-500 transition">
                      Přihlásit se
                    </button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p className="text-center text-white">Žádné kurzy nenalezeny.</p>
        )}
      </div>
    </div>
  );
}

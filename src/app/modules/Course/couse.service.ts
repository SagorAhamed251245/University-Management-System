import QueryBuilder from '../../builder/QueryBuilder';
import { TCourses } from './course.interface';
import { Course } from './course.model';
import { CourseSearchableFields } from './course.constent';

const createCourseIntoDB = async (payload: TCourses) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

/* const updatedCourseIntoDB = async (id: string, payload) => {
  const result = await Course.findById(id);
  return result;
}; */

const deletedCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deletedCourseFromDB,
};

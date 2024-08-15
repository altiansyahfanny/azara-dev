import { useFetchClassroomCoursesQuery } from "@/api/classroomApi";
import { SelectItem } from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";

const ClassroomCoursesOptions = () => {
    const {
        data: classroomCourses,
        isLoading: isLoadingClassroomCourses,
        isSuccess: isSuccessClassroomCourses,
        isError: isErrorClassroomCourses,
    } = useFetchClassroomCoursesQuery();

    if (isLoadingClassroomCourses) {
        return (
            <div className="bg-red-500x min-h-20 grid place-content-center">
                <LoaderCircle className="animate-spin" />
            </div>
        );
    }

    if (isErrorClassroomCourses) {
        return (
            <div className="bg-red-500x min-h-20 grid place-content-center">
                <p className="text-sm">Tidak dapat memuat pelajaran kelas.</p>
            </div>
        );
    }

    if (isSuccessClassroomCourses) {
        if (classroomCourses.data.classroomCourses.length === 0) {
            return (
                <div className="bg-red-500x min-h-20 grid place-content-center">
                    <p className="text-sm">Tidak ada pelajaran kelas.</p>
                </div>
            );
        } else {
            return (
                <>
                    {classroomCourses.data.classroomCourses.map((cc, key) => (
                        <SelectItem key={key} value={cc.id.toString()}>
                            {`${cc.classroomName} - ${cc.courseName}`}
                        </SelectItem>
                    ))}
                </>
            );
        }
    }

    return null;
};

export default ClassroomCoursesOptions;

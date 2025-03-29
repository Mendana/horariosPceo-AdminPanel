import { HeaderNav } from "../components/HeaderNav.jsx";
import { CreateSubject } from "../components/CreateSubject.jsx";
import { SubjectList } from "../components/SubjectList.jsx";

export const Schedule = () => {
    return (
      <section>
        <HeaderNav title='Administración de Horarios' />
        <section className="flex flex-col items-center pt-10">
          <CreateSubject />
          <SubjectList />
        </section>
      </section>
    );
  };
  
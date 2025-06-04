import { HeaderNav } from "../components/HeaderNav.jsx";
import { UserList } from "../components/UserList.jsx";

export const Users = () => {
  return (
    <section>
      <HeaderNav title='Administración de Usuarios' />
      <section className="flex flex-col items-center md:pt-10 pb-15">
        <UserList />
      </section>
    </section>
  );
};

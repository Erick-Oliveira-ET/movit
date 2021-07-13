import { Container } from "../styles/components/Profile";
import { useTranslation } from "next-i18next";


const Profile = () => {
  const { t } = useTranslation("profile");
  
  return (
    <Container>
      <a href="https://github.com/Erick-Oliveira-ET" target="blanck">
        <img
          src="https://avatars.githubusercontent.com/u/53864964?s=60&v=4"
          alt="Erick Tomaz"
        />
        <div>
          <p>{t("developedBy")}</p>
          <strong>Erick Tomaz Oliveira</strong>
        </div>
      </a>
    </Container>
  );
};

export default Profile;

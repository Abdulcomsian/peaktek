import React, { useRef, useEffect, useState } from "react";
import "./tabComponent.css";
import CustomerAgreementPage from "../pages/CustomerAgreement";
import WarrantyInformationPage from "../pages/WarrantyInformation";
import MaterialOrderPage from "../pages/MaterialOrder";
import { Link } from "react-router-dom";

const TabComponent = ({ selectedTask }) => {
  const [tabTitle, setTabTitle] = useState([
    "Customer Agreement",
    "Warranty Information",
    "Material Order",
    "Job details",
    "Tasks",
    "Proposals",
    "Invoices",
    "Attachments",
  ]);
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState(0);

  const scrollToSection = (index) => {
    console.log(index);
    const section = sectionRefs.current[index];
    if (section) {
      setActiveTab(index);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = sectionRefs.current;
      let activeIndex = 0;

      for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeIndex = i;
          break;
        }
      }

      setActiveTab(activeIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {selectedTask}
      <div className="tabs-container">
        {tabTitle.map((title, index) => (
          <button
            className={`p-2 btn-tab  ${activeTab === index ? "active" : ""}`}
            onClick={() => scrollToSection(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="tab-pan-container">
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="tab-section"
        >
          <h2>Customer Agreement</h2>
          <Link className="btn" to="/customer-agreement">
            Create Agreement
          </Link>
        </section>
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="tab-section"
        >
          <h2>Warranty Information</h2>
          <Link className="btn" to="/warranty-information">
            Create Warranty Information
          </Link>
        </section>
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="tab-section"
        >
          <h2>Material Order</h2>
          <Link className="btn" to="/material-order">
            Create Material Order
          </Link>
        </section>
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="tab-section"
        >
          Section 4 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Sapiente, inventore soluta incidunt ratione excepturi veniam cumque
          unde tempora atque autem, neque at numquam aliquid id nihil odio
          facere repudiandae sit doloremque hic quaerat quae illum ut!
          Temporibus perferendis sunt dolores voluptatibus laborum culpa nobis
          libero cum vel neque? In voluptas laudantium animi molestiae quo earum
          mollitia provident est repellendus reiciendis ipsam hic, blanditiis
          nam? Reprehenderit veritatis nesciunt autem tempora et eligendi vitae
          atque, nihil aspernatur dolorem nobis quaerat placeat dolores.
          Pariatur provident aspernatur quisquam reprehenderit nesciunt
          laboriosam beatae. Laudantium maiores nemo similique repellat.
          Excepturi asperiores, illum perferendis, non ullam corrupti
          exercitationem expedita tenetur ut dolores nam minima quibusdam
          numquam veritatis ea ducimus placeat pariatur natus at est
          perspiciatis saepe aperiam obcaecati tempore! Fugit, cupiditate
          tempore tenetur expedita id ducimus explicabo assumenda, quia in nobis
          quasi obcaecati eligendi debitis aspernatur neque et ipsa delectus
          quod sed. Magni alias ullam cumque dolore adipisci, provident tenetur
          unde veritatis esse vitae itaque eveniet possimus voluptatibus, harum
          quam consectetur corporis iste, quibusdam animi sapiente ipsum vero!
          Assumenda eligendi autem tempore error facilis reprehenderit adipisci
          sequi excepturi neque asperiores in rerum explicabo, fugiat sint
          officia soluta hic perferendis vitae consequuntur earum nostrum totam
          illum consequatur. Corrupti animi consequuntur quia in minima cum
          aperiam, rem soluta quasi, eius, ea voluptatum magnam neque velit
          quae? Culpa eum quasi, dolorum, consequuntur maxime labore eos quidem
          sed officiis velit praesentium eaque nam necessitatibus reiciendis
          minima consectetur dicta id nobis molestias. Fugiat eos quaerat
          molestiae modi impedit repellat ducimus excepturi consequuntur
          commodi. Sed necessitatibus reiciendis iusto molestias! Provident
          incidunt quibusdam alias praesentium, illum possimus voluptatem quidem
          officia sapiente expedita repudiandae ullam quae mollitia reiciendis
          numquam at perferendis assumenda quod vel iure officiis. Amet totam
          sed unde minus blanditiis veritatis adipisci accusamus. Fuga quos
          voluptatem est dolorum non aspernatur pariatur quidem accusamus veniam
          quaerat assumenda ad tempora hic, rem tempore soluta quae totam
          incidunt enim facere dolore modi! Officia, iste tempore! Ipsam
          quibusdam tempora nulla quaerat aspernatur ullam officiis cupiditate
          explicabo eius consectetur voluptate repudiandae magni dicta
          asperiores tempore ex corrupti animi ipsa quas ratione, minima
          molestias id ipsum. Dolorem, possimus? Mollitia, laudantium omnis.
          Molestiae omnis, molestias magni labore neque mollitia accusamus
          quasi, sit assumenda voluptates sequi, consequatur quidem quia itaque
          placeat minus hic minima possimus. Ipsum optio quo eos iste
          voluptatibus iusto a, id reiciendis dolorum minus, facere laboriosam?
          Sapiente beatae assumenda eum voluptates numquam atque culpa quis,
          voluptatum maiores laudantium odit, saepe cupiditate, dignissimos
          deleniti facere. Repellat cupiditate quod temporibus deserunt
          accusamus! Velit quasi minima dolores nam vel quos. Nihil voluptatum
          autem dolore nisi, libero fugit repellendus officia quod doloribus
          soluta vel dolorem consequuntur rem explicabo magni enim voluptates
          mollitia, voluptatem natus excepturi ducimus esse? Ullam tempore nam
          dignissimos. Quibusdam fuga, iusto quisquam maiores vero iste sequi
          porro corporis explicabo itaque est, quo temporibus laborum iure ex
          accusamus, asperiores odio ducimus aut perspiciatis! Fuga cumque,
          molestiae provident hic expedita voluptate. Doloremque, veritatis!
          Quisquam exercitationem excepturi dolorem laudantium. Eum animi
          recusandae sint incidunt nostrum alias vel explicabo dignissimos!
          Voluptas nesciunt quis, sint illum magni culpa, quos temporibus
          necessitatibus, quae mollitia earum velit animi quibusdam doloremque
          quod laudantium eius voluptatem ut sapiente accusamus dignissimos?
          Similique debitis ea quod consequuntur aspernatur omnis rem earum
          fugit doloribus placeat, mollitia maxime. Provident, aperiam labore ad
          quibusdam maiores nesciunt obcaecati magni commodi fugit pariatur est,
          aliquid ratione eveniet nihil repudiandae saepe cum quae. Officiis
          ipsum, hic est itaque quos amet sunt! Magnam perferendis obcaecati
          facere, aperiam maiores necessitatibus nulla repudiandae inventore
          explicabo. Qui cumque accusamus atque. Architecto totam porro incidunt
          alias, ab non voluptate nulla aut eaque minus pariatur, aperiam illum
          iste dolores nihil esse obcaecati.
        </section>
      </div>
    </div>
  );
};

export default TabComponent;

import styles from "../../styles/Home.module.scss";
import {AutoComplete, Avatar, Input, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import Link from "next/link";

const { Text} = Typography;

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

export default function Header() {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  return (
    <>
      <header className={styles.head}>
        <div>
          <Avatar style={{margin: 10}}  size={64} icon={<UserOutlined />} />
          <Text strong>Виктор Башинскый</Text>
        </div>

        <div className={styles.topText}>
          ЛИНИЯ ЗАСТРОЙКИ - Линия застройки-проектная линия, регулирующая размещение зданий в пределах участков, ограниченных
          красными линиями. Линия застройки определяет границы застраиваемой территории. В соответствии с
          проектами застройки линия застройки может совпадать с красной линией, но, как правило, она отступает от нее
          в глубину кварталов и микрорайонов на 3 - 6 м и более. Пространство между красной линией и линией
          застройки используется для защитных зеленых полос, изолирующих территорию транспортных магистралей и
          тротуаров от зданий.
        </div>
      </header>

      <nav className={styles.nav}>
        <ul>
          <li><Link href="/">Главная</Link></li>
          <li><Link href='/about'>Обо мне</Link></li>
          <li><Link href="/book">Книга</Link></li>
          <li><Link href="">Благодарности</Link></li>
          <li>
            <AutoComplete
              options={options}
              style={{
                width: 200,
              }}
              onSelect={onSelect}
              onSearch={onSearch}
            >
              <Input.Search size="large" placeholder="Поиск по книге" />
            </AutoComplete>
          </li>
        </ul>
      </nav>
    </>
  )
}

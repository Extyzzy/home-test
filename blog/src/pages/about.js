import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'
import { Card, Col, Row } from 'antd';
import Link from "next/link";
import React from "react";
import Header from "../components/Header";

export default function About() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Обо мне</title>
      </Head>

      <Header />

      <main>
        <div className="site-card-wrapper">
          <Row gutter={16} type="flex" align="middle">
            <Col span={8}>
              <Card title="Телефон" bordered={false}>
                 +37399949455
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Email" bordered={false}>
                  email@mail.ru
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Адресс" bordered={false}>
                 str. Stefan cel Mare 174
              </Card>
            </Col>
          </Row>
        </div>,

      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

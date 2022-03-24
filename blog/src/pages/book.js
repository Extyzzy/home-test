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
        <title>Книга</title>
      </Head>

      <Header />

      <main>
        Книга
      </main>
    </div>
  )
}

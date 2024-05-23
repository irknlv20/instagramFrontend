import Login from '@/app/login/page'
import Registration from '@/components/auth/registration'
import Footer from '@/components/footer'
export default function Home() {
  return (
    <main className="wrapper">
      <Registration></Registration>
      <Footer></Footer>
    </main>
  )
}

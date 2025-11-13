'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaShoppingCart, FaGavel, FaWallet, FaClipboardList } from 'react-icons/fa'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [product, setProduct] = useState<any>(null)
  const [wallet, setWallet] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      window.location.href = '/login'
    }

    // جلب بيانات المنتج من localStorage
    const mallProducts = localStorage.getItem('mallProducts')
    if (mallProducts) {
      const parsed = JSON.parse(mallProducts)
      const foundProduct = parsed.find((p: any) => p.id === parseInt(params.id as string))
      if (foundProduct) {
        setProduct({
          id: foundProduct.id,
          name: `${foundProduct.designName} - ${foundProduct.productType === 'tshirt' ? 'تي شيرت' : foundProduct.productType}`,
          price: foundProduct.price,
        })
      } else {
        // منتجات افتراضية
        const products: any = {
          '1': { id: 1, name: 'تي شيرت بريميوم - تصميم X', price: 200 },
          '2': { id: 2, name: 'تي شيرت كلاسيك - تصميم Y', price: 150 },
          '3': { id: 3, name: 'تي شيرت رياضي - تصميم Z', price: 180 },
        }
        setProduct(products[params.id as string] || products['1'])
      }
    } else {
      // منتجات افتراضية
      const products: any = {
        '1': { id: 1, name: 'تي شيرت بريميوم - تصميم X', price: 200 },
        '2': { id: 2, name: 'تي شيرت كلاسيك - تصميم Y', price: 150 },
        '3': { id: 3, name: 'تي شيرت رياضي - تصميم Z', price: 180 },
      }
      setProduct(products[params.id as string] || products['1'])
    }

    // جلب بيانات المحفظة
    const walletData = localStorage.getItem('wallet')
    if (walletData) {
      setWallet(JSON.parse(walletData))
    } else {
      setWallet({ total: 0, free: 0, locked: 0 })
    }
  }, [params])

  const handleConfirm = () => {
    if (!wallet || wallet.total < product.price) {
      alert('رصيدك غير كافٍ. يرجى شحن المحفظة أولاً.')
      return
    }

    // خصم من الرصيد المقفل أولاً
    let newLocked = wallet.locked
    let newFree = wallet.free
    let remaining = product.price

    if (newLocked > 0) {
      if (newLocked >= remaining) {
        newLocked -= remaining
        remaining = 0
      } else {
        remaining -= newLocked
        newLocked = 0
      }
    }

    // خصم الباقي من الرصيد الحر
    if (remaining > 0) {
      newFree -= remaining
    }

    const newWallet = {
      total: wallet.total - product.price,
      free: newFree,
      locked: newLocked,
    }

    localStorage.setItem('wallet', JSON.stringify(newWallet))

    // حفظ الطلب
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push({
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      price: product.price,
      date: new Date().toISOString(),
      status: 'pending',
    })
    localStorage.setItem('orders', JSON.stringify(orders))

    // إشعار المصنع بطلب جديد
    const factoryOrders = JSON.parse(localStorage.getItem('factoryOrders') || '[]')
    factoryOrders.push({
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      price: product.price,
      date: new Date().toISOString(),
      status: 'new',
    })
    localStorage.setItem('factoryOrders', JSON.stringify(factoryOrders))

    alert('تم تأكيد الطلب بنجاح!')
    router.push('/app/orders')
  }

  if (!currentUser || !product || !wallet) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">تفصيل</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">تأكيد الدفع</h2>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">المنتج</p>
              <p className="text-xl font-semibold">{product.name}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">المبلغ الإجمالي</p>
              <p className="text-2xl font-bold text-indigo-600">{product.price} TFT</p>
            </div>
            {wallet.locked > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 font-semibold">
                  ⚠️ سيتم الخصم من رصيدك المقفل ({wallet.locked} TFT) أولاً.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={wallet.total < product.price}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          تأكيد الدفع
        </button>

        {wallet.total < product.price && (
          <Link href="/app/wallet" className="block text-center mt-4 text-indigo-600 hover:underline">
            شحن المحفظة
          </Link>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            <Link href="/app/mall" className="flex flex-col items-center text-indigo-600">
              <FaShoppingCart className="text-xl mb-1" />
              <span className="text-xs">المول</span>
            </Link>
            <Link href="/app/auction" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
              <FaGavel className="text-xl mb-1" />
              <span className="text-xs">المزاد</span>
            </Link>
            <Link href="/app/wallet" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
              <FaWallet className="text-xl mb-1" />
              <span className="text-xs">المحفظة</span>
            </Link>
            <Link href="/app/orders" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
              <FaClipboardList className="text-xl mb-1" />
              <span className="text-xs">طلباتي</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StoreSetupPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [design, setDesign] = useState<any>(null)
  const [formData, setFormData] = useState({
    productType: '',
    factory: '',
    profit: '',
  })
  const [factories, setFactories] = useState([
    { id: 1, name: 'مصنع النسيج المتقدم', cost: 50 },
    { id: 2, name: 'مصنع الأزياء الحديثة', cost: 60 },
    { id: 3, name: 'مصنع الجودة العالية', cost: 45 },
  ])
  const [selectedFactory, setSelectedFactory] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role !== 'designer') {
        router.push('/')
        return
      }
      setCurrentUser(userData)
    } else {
      router.push('/login')
      return
    }

    const selectedDesign = localStorage.getItem('selectedDesignForStore')
    if (selectedDesign) {
      setDesign(JSON.parse(selectedDesign))
    } else {
      router.push('/designer/dashboard')
    }
  }, [router])

  const handleFactoryChange = (factoryId: string) => {
    const factory = factories.find(f => f.id === parseInt(factoryId))
    setSelectedFactory(factory)
    setFormData({ ...formData, factory: factoryId })
  }

  const calculatePrice = () => {
    if (!selectedFactory || !formData.profit) return 0
    const factoryCost = selectedFactory.cost
    const platformFee = factoryCost * 0.3
    const profit = parseFloat(formData.profit) || 0
    return factoryCost + platformFee + profit
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.productType || !formData.factory || !formData.profit) {
      alert('يرجى ملء جميع الحقول')
      return
    }

    const finalPrice = calculatePrice()
    
    // حفظ المنتج في المول
    const products = JSON.parse(localStorage.getItem('mallProducts') || '[]')
    products.push({
      id: Date.now(),
      designId: design.id,
      designName: design.name,
      productType: formData.productType,
      factoryId: selectedFactory.id,
      factoryName: selectedFactory.name,
      factoryCost: selectedFactory.cost,
      platformFee: selectedFactory.cost * 0.3,
      profit: parseFloat(formData.profit),
      price: finalPrice,
      date: new Date().toISOString(),
    })
    localStorage.setItem('mallProducts', JSON.stringify(products))

    router.push('/designer/success')
  }

  if (!currentUser || !design) {
    return <div>جاري التحميل...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">إعداد المنتج للمول</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">الخطوة 1: اختر المنتج الخام</label>
            <select
              required
              value={formData.productType}
              onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">اختر المنتج</option>
              <option value="tshirt">تي شيرت</option>
              <option value="cup">كوب</option>
              <option value="hoodie">هودي</option>
              <option value="poster">ملصق</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الخطوة 2: اختر المصنع</label>
            <select
              required
              value={formData.factory}
              onChange={(e) => handleFactoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">اختر المصنع</option>
              {factories.map((factory) => (
                <option key={factory.id} value={factory.id}>
                  {factory.name} - {factory.cost} TFT
                </option>
              ))}
            </select>
          </div>

          {selectedFactory && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">تكلفة المصنع:</span>
                <span className="font-semibold">{selectedFactory.cost} TFT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">عمولة تفصيل (30%):</span>
                <span className="font-semibold">{(selectedFactory.cost * 0.3).toFixed(0)} TFT</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">الخطوة 3: تحديد السعر - ربحك</label>
            <input
              type="number"
              required
              value={formData.profit}
              onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="75"
            />
            <p className="text-sm text-gray-500 mt-1">أدخل ربحك بالـ TFT</p>
          </div>

          {formData.profit && selectedFactory && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">السعر النهائي للعميل:</span>
                <span className="text-2xl font-bold text-indigo-600">{calculatePrice()} TFT</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            نشر في المول
          </button>
        </form>
      </main>
    </div>
  )
}

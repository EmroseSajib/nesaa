'use client'

import { useState } from 'react'
import { useLanguage } from '@/app/LanguageContext'
import { orders, users } from '@/lib/mockData'
import { User, MapPin, ShoppingBag, LogOut } from 'lucide-react'

export default function AccountPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')
  const currentUser = users[0]
  const userOrders = orders.filter(o => o.userId === currentUser.id)

  const tabs = [
    { id: 'profile', label: t.account.profile, icon: User },
    { id: 'addresses', label: t.account.addresses, icon: MapPin },
    { id: 'orders', label: t.account.orders, icon: ShoppingBag },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">{t.account.title}</h1>
          <button className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            {t.account.logout}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border flex-wrap">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 px-4 font-medium transition-colors border-b-2 -mb-[2px] ${
                  activeTab === tab.id
                    ? 'text-accent border-accent'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeTab === 'profile' && (
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.account.editProfile}</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      defaultValue={currentUser.name.split(' ')[0]}
                      placeholder="First Name"
                      className="px-4 py-3 border border-border rounded-lg bg-background"
                    />
                    <input
                      type="text"
                      defaultValue={currentUser.name.split(' ')[1]}
                      placeholder="Last Name"
                      className="px-4 py-3 border border-border rounded-lg bg-background"
                    />
                  </div>

                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                  />

                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                  />

                  <button className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{t.account.addresses}</h2>
                  <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                    {t.account.addAddress}
                  </button>
                </div>

                <div className="space-y-4">
                  {currentUser.addresses.map(address => (
                    <div key={address.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-foreground">{address.name}</h3>
                        <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                          {address.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zip}<br />
                        {address.country}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {userOrders.length > 0 ? (
                  userOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className={`p-6 ${index !== userOrders.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {order.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-accent">${order.total}</p>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-2 ${
                            order.status === 'delivered'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {order.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground mb-4">
                        {order.items.map((item, i) => (
                          <p key={i}>{item.name} x{item.quantity}</p>
                        ))}
                      </div>

                      <button className="text-accent font-semibold hover:underline">
                        {t.account.viewOrder}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-muted-foreground">
                    No orders yet
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-accent/10 rounded-2xl border border-accent/30 p-6">
              <h3 className="font-semibold text-foreground mb-4">Account Info</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Name:</strong> {currentUser.name}</p>
                <p><strong className="text-foreground">Email:</strong> {currentUser.email}</p>
                <p><strong className="text-foreground">Member Since:</strong> Dec 2022</p>
                <p><strong className="text-foreground">Total Orders:</strong> {userOrders.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

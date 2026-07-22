/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data';
import { FileText, CheckCircle2, UserCheck, ShieldAlert, Award, Calendar, Layers, Sparkles, Phone, Users, MapPin, Gift, Clock } from 'lucide-react';

interface Consultation {
  id: string;
  serviceId: string;
  orgName: string;
  contactEmail: string;
  scope: string;
  date: string;
}

interface EventBooking {
  id: string;
  clientNames: string;
  contactEmail: string;
  contactPhone: string;
  eventType: string;
  eventDate: string;
  venueLocation: string;
  guestCount: string;
  packageType: string;
  details: string;
  dateCreated: string;
}

export default function ServicesView() {
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0].id);
  const [orgName, setOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [scope, setScope] = useState('');
  
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Form tab selection state
  const [activeTab, setActiveTab] = useState<'consultation' | 'booking'>('consultation');

  // Event Booking Form states
  const [clientNames, setClientNames] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [eventType, setEventType] = useState('wedding');
  const [eventDate, setEventDate] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [guestCount, setGuestCount] = useState('100-300');
  const [packageType, setPackageType] = useState('premium');
  const [bookingDetails, setBookingDetails] = useState('');
  const [eventBookings, setEventBookings] = useState<EventBooking[]>([]);
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState('');

  useEffect(() => {
    const savedConsultations = localStorage.getItem('ag_consultations');
    if (savedConsultations) {
      setConsultations(JSON.parse(savedConsultations));
    }
    const savedBookings = localStorage.getItem('ag_event_bookings');
    if (savedBookings) {
      setEventBookings(JSON.parse(savedBookings));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactEmail || !scope) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const newConsultation: Consultation = {
      id: Math.random().toString(),
      serviceId: selectedService,
      orgName,
      contactEmail,
      scope,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const updated = [newConsultation, ...consultations];
    setConsultations(updated);
    localStorage.setItem('ag_consultations', JSON.stringify(updated));

    // Reset Form
    setOrgName('');
    setContactEmail('');
    setScope('');
    setSuccessMessage('Consultation proposal received. Our strategic director will evaluate your request and respond within 72 business hours with a formal prospectus.');

    setTimeout(() => {
      setSuccessMessage('');
    }, 8000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientNames || !bookingEmail || !bookingPhone || !eventDate || !venueLocation) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const newBooking: EventBooking = {
      id: Math.random().toString(),
      clientNames,
      contactEmail: bookingEmail,
      contactPhone: bookingPhone,
      eventType,
      eventDate,
      venueLocation,
      guestCount,
      packageType,
      details: bookingDetails,
      dateCreated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    const updated = [newBooking, ...eventBookings];
    setEventBookings(updated);
    localStorage.setItem('ag_event_bookings', JSON.stringify(updated));

    // Reset Form
    setClientNames('');
    setBookingEmail('');
    setBookingPhone('');
    setEventType('wedding');
    setEventDate('');
    setVenueLocation('');
    setGuestCount('100-300');
    setPackageType('premium');
    setBookingDetails('');
    setBookingSuccessMessage('Wedding & Event Media coverage booking received. Our production manager (Peter Deng Akuei) will review the date and venue details, check active equipment/crew availability, and contact you within 48 business hours.');

    setTimeout(() => {
      setBookingSuccessMessage('');
    }, 8000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="services-view-container">
      {/* Section Header */}
      <div className="border-b border-sand-200 pb-6 space-y-3">
        <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Bilateral Professional Offerings</p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900">
          Institutional Advisory & Communications
        </h1>
        <p className="text-sm text-charcoal-900/80 max-w-2xl leading-relaxed">
          AG Media provides research-backed, culturally respectful documentary cinema, digital archiving, strategic communications, and cinematic coverage of traditional weddings and community celebrations.
        </p>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="bg-white border border-sand-200 p-8 flex flex-col justify-between space-y-6 shadow-2xs hover:border-clay-500 transition-colors"
            id={`service-card-${service.id}`}
          >
            <div className="space-y-4">
              {/* Header Title block */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-wider font-bold text-clay-500 bg-clay-500/10 px-2.5 py-1">
                  Verified Offering
                </span>
                <h3 className="font-serif text-xl font-bold text-charcoal-900">
                  {service.title}
                </h3>
              </div>

              <p className="text-xs text-charcoal-900/90 leading-relaxed font-sans">
                {service.description}
              </p>

              {/* Core Deliverables list */}
              <div className="space-y-2 pt-2">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-clay-500 font-sans">Core Institutional Deliverables:</h4>
                <ul className="space-y-1.5">
                  {service.deliverables.map((deliv, index) => (
                    <li key={index} className="flex items-start space-x-2 text-xs text-charcoal-900 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-clay-500 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Target Audience & Consultation focus */}
            <div className="pt-6 border-t border-sand-200/50 space-y-3 text-xs font-sans">
              <div>
                <p className="text-[10px] uppercase font-bold text-charcoal-900/60">Eligible Clientele</p>
                <p className="mt-0.5 text-charcoal-900/85 font-medium">{service.audience}</p>
              </div>
              <div className="bg-sand-50 p-3 border-l-2 border-clay-500">
                <p className="text-[10px] uppercase font-bold text-clay-500">Key Strategic Focus</p>
                <p className="mt-0.5 text-charcoal-900/90 italic">"{service.consultationFocus}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =================== INTERACTIVE INTAKE INTERFACE WITH TABS =================== */}
      <div className="mt-16 bg-sand-50/45 border border-sand-200 p-6 md:p-8 max-w-4xl mx-auto shadow-2xs">
        
        {/* Tab switch buttons */}
        <div className="flex border-b border-sand-200 mb-8 font-sans text-xs">
          <button
            onClick={() => setActiveTab('consultation')}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'consultation'
                ? 'border-clay-500 text-clay-500 bg-white border-t border-x border-sand-200 -mb-[2px] z-10'
                : 'border-transparent text-charcoal-900/65 hover:text-clay-500 hover:bg-sand-100/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Institutional Consultation</span>
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === 'booking'
                ? 'border-clay-500 text-clay-500 bg-white border-t border-x border-sand-200 -mb-[2px] z-10'
                : 'border-transparent text-charcoal-900/65 hover:text-clay-500 hover:bg-sand-100/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Celebration / Wedding</span>
          </button>
        </div>

        {activeTab === 'consultation' ? (
          <div>
            <div className="border-b border-sand-200 pb-4 mb-6 space-y-1">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                Initiate a Formal Consultation Proposal
              </h3>
              <p className="text-xs text-charcoal-900/70 font-sans">
                Please register your organization's criteria. Our Australian-South Sudanese directors evaluate submissions against strict capacity standards.
              </p>
            </div>

            {successMessage ? (
              <div className="bg-white border border-ochre-500 p-6 text-center space-y-2">
                <Award className="w-8 h-8 text-clay-500 mx-auto" />
                <p className="text-sm font-bold text-charcoal-900">Proposal Logged Under Priority Reference</p>
                <p className="text-xs text-charcoal-900/80 leading-relaxed max-w-lg mx-auto">{successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Select Service */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Select Service Track *</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden cursor-pointer"
                    >
                      {SERVICES_DATA.filter(s => s.id !== 'wedding-event-coverage').map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Organization Name */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Organization/Institution Name *</label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. United Nations Cultural Liaison Office Juba"
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email address */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Official Representative Email *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. representative@institution.org"
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="bg-sand-50 p-3 border border-sand-200 flex items-start space-x-2">
                      <ShieldAlert className="w-5 h-5 text-clay-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-charcoal-900/70 leading-relaxed">
                        By submitting, you certify that this inquiry represents an official institutional interest, with legal capacity to fund or co-sponsor archival campaigns.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scope details */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Project Brief / Archival Mandate Details *</label>
                  <textarea
                    rows={5}
                    required
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    placeholder="Detail the geographic area, community demographics, linguistic criteria, and planned timelines for this project."
                    className="w-full bg-white border border-sand-200 p-3 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-clay-500 hover:bg-clay-600 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Submit Formal Prospectus Proposal</span>
                </button>
              </form>
            )}

            {/* Dynamic Registered Submissions Log to show absolute reality */}
            {consultations.length > 0 && (
              <div className="mt-8 border-t border-sand-200 pt-6 space-y-4">
                <h4 className="font-serif text-xs font-bold text-charcoal-900 uppercase tracking-widest">
                  Consultations Lodged (Active Session Ledger)
                </h4>
                <div className="space-y-3">
                  {consultations.map((c) => {
                    const service = SERVICES_DATA.find((s) => s.id === c.serviceId);
                    return (
                      <div key={c.id} className="bg-white border border-sand-200 p-4 text-xs font-sans flex flex-col sm:flex-row justify-between items-start gap-4 shadow-2xs">
                        <div>
                          <span className="bg-clay-500/20 text-clay-500 font-bold px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider">
                            {service?.title || 'Custom Track'}
                          </span>
                          <p className="font-bold text-charcoal-900 mt-2">{c.orgName}</p>
                          <p className="text-[10px] text-charcoal-900/60 font-semibold uppercase">{c.contactEmail}</p>
                          <p className="mt-1.5 text-charcoal-900/80 italic font-serif leading-relaxed line-clamp-2">
                            "{c.scope}"
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-charcoal-900/50 font-semibold">{c.date}</span>
                          <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">PENDING AUDIT</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="border-b border-sand-200 pb-4 mb-6 space-y-1">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                Book Event Media & Cinematic Coverage
              </h3>
              <p className="text-xs text-charcoal-900/70 font-sans">
                Reserve AG Media for your traditional wedding, milestone celebration, or community union. Our Managing Director Peter Deng Akuei oversees every event pipeline.
              </p>
            </div>

            {bookingSuccessMessage ? (
              <div className="bg-white border border-ochre-500 p-6 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-clay-500 mx-auto animate-pulse" />
                <p className="text-sm font-bold text-charcoal-900">Celebration Booking Logged Successfully</p>
                <p className="text-xs text-charcoal-900/80 leading-relaxed max-w-lg mx-auto">{bookingSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client / Couple Names */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Client Name / Couple Names *</label>
                    <input
                      type="text"
                      required
                      value={clientNames}
                      onChange={(e) => setClientNames(e.target.value)}
                      placeholder="e.g. James Lado & Mary Nyandeng"
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Event Type selection */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Type of Celebration *</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden cursor-pointer"
                    >
                      <option value="wedding">Traditional Wedding / Matrimonial Union</option>
                      <option value="anniversary">Milestone Anniversary Celebration</option>
                      <option value="gathering">Communal Festival / Cultural Gathering</option>
                      <option value="milestone">Family Portrait Session & Private Milestone</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email address */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Contact Email *</label>
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="e.g. couple@celebration.net"
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="e.g. +211 920 000 000"
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Planned Event Date *</label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Venue Location */}
                  <div className="md:col-span-1">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Venue & Location *</label>
                    <input
                      type="text"
                      required
                      value={venueLocation}
                      onChange={(e) => setVenueLocation(e.target.value)}
                      placeholder="e.g. Juba Landmark Hotel / Melbourne"
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Estimated Guest Count */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Guest Count *</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden cursor-pointer"
                    >
                      <option value="under-100">Intimate Celebration (Under 100 guests)</option>
                      <option value="100-300">Standard Gathering (100-300 guests)</option>
                      <option value="300-500">Large Celebration (300-500 guests)</option>
                      <option value="500-plus">Grand Tribal Wedding (500+ guests)</option>
                    </select>
                  </div>

                  {/* Coverage Package selection */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Coverage Package *</label>
                    <select
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      className="w-full bg-white border border-sand-200 px-3 py-2.5 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden cursor-pointer"
                    >
                      <option value="standard-photo">Documentary Photography Only</option>
                      <option value="cinematic-film">Cinematic Feature Film Only</option>
                      <option value="premium">Combined Premium Master Package</option>
                      <option value="custom">Custom High-End Archival Coverage</option>
                    </select>
                  </div>
                </div>

                {/* Celebration details / special customary guidelines */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-charcoal-900 mb-1.5">Special Cultural / Family Requests & Details</label>
                  <textarea
                    rows={4}
                    value={bookingDetails}
                    onChange={(e) => setBookingDetails(e.target.value)}
                    placeholder="List specific cultural traditional rituals, specific elder testimonies you would like captured, and general timing plans."
                    className="w-full bg-white border border-sand-200 p-3 text-xs text-charcoal-900 focus:border-clay-500 focus:outline-hidden"
                  />
                </div>

                <div className="bg-sand-50 p-4 border border-sand-200 flex items-start space-x-3 text-[11px] text-charcoal-900/75 font-sans leading-relaxed">
                  <UserCheck className="w-5 h-5 text-clay-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-charcoal-900 text-xs">Direct Production Assignment Notice:</p>
                    <p className="mt-0.5">
                      Wedding bookings are handled with sovereign narrative honor. Your project will be overseen by <strong>Peter Deng Akuei</strong> (Managing Director, Juba) and filmed on-location by <strong>Chol Philip Achiek (Chopa)</strong> and <strong>Abraham Akuei Manyok</strong>.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-clay-500 hover:bg-clay-600 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Register Celebration Booking Request</span>
                </button>
              </form>
            )}

            {/* Dynamic Event Bookings Ledger list */}
            {eventBookings.length > 0 && (
              <div className="mt-8 border-t border-sand-200 pt-6 space-y-4">
                <h4 className="font-serif text-xs font-bold text-charcoal-900 uppercase tracking-widest">
                  Event Bookings Lodged (Active Session Ledger)
                </h4>
                <div className="space-y-3">
                  {eventBookings.map((b) => (
                    <div key={b.id} className="bg-white border border-sand-200 p-4 text-xs font-sans flex flex-col md:flex-row justify-between items-start gap-4 shadow-2xs">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="bg-clay-500/10 text-clay-500 font-bold px-2 py-0.5 text-[8px] uppercase tracking-wider border border-clay-500/20">
                            {b.eventType.toUpperCase()}
                          </span>
                          <span className="bg-sand-100 text-charcoal-900/70 font-semibold px-2 py-0.5 text-[8px] uppercase tracking-wider">
                            {b.packageType.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="font-serif text-base font-bold text-charcoal-900">{b.clientNames}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-6 text-[11px] text-charcoal-900/70 pt-1">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-clay-500 shrink-0" />
                            <span>Date: <strong>{b.eventDate}</strong></span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-clay-500 shrink-0" />
                            <span>Venue: <strong>{b.venueLocation}</strong></span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-3.5 h-3.5 text-clay-500 shrink-0" />
                            <span>Guests: <strong>{b.guestCount}</strong></span>
                          </span>
                        </div>

                        {b.details && (
                          <p className="mt-2 text-charcoal-900/80 italic font-serif leading-relaxed line-clamp-2 bg-sand-50/50 p-2 border-l border-sand-300">
                            "{b.details}"
                          </p>
                        )}
                        <p className="text-[9px] text-charcoal-900/50 uppercase font-semibold">
                          Primary Contact: {b.contactEmail} | {b.contactPhone}
                        </p>
                      </div>

                      <div className="text-right shrink-0 flex flex-col items-end space-y-1 justify-between h-full">
                        <span className="text-[10px] text-charcoal-900/50 font-semibold">Logged: {b.dateCreated}</span>
                        <div className="bg-clay-500/10 text-clay-500 border border-clay-500/20 text-[9px] font-bold px-2 py-1 uppercase tracking-widest mt-2">
                          PETER DENG ASSIGNED
                        </div>
                        <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">DATES UNDER REVIEW</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
